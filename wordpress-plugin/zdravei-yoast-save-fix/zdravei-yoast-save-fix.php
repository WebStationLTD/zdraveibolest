<?php
/**
 * Plugin Name: Zdravei Yoast Save Fix
 * Description: Ensures Yoast SEO meta descriptions persist when saving from the block editor.
 * Version: 1.2.0
 * Author: Cursor
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('enqueue_block_editor_assets', 'zdravei_yoast_block_editor_save_fix', 20);
function zdravei_yoast_block_editor_save_fix() {
    $script = <<<'JS'
( function( wp ) {
    if ( ! wp || ! wp.data ) {
        return;
    }

    const { subscribe, select, dispatch } = wp.data;
    let metaBoxesInitAttempted = false;
    let wasSavingPost = false;

    function syncYoastMetaToEditor() {
        const yoastSelect = select( 'yoast-seo/editor' );
        const editorDispatch = dispatch( 'core/editor' );

        if ( ! yoastSelect || ! editorDispatch || ! editorDispatch.editPost ) {
            return;
        }

        const meta = {};
        const description = yoastSelect.getDescription ? yoastSelect.getDescription() : '';
        const title = yoastSelect.getSeoTitle ? yoastSelect.getSeoTitle() : '';
        const focus = yoastSelect.getFocusKeyphrase ? yoastSelect.getFocusKeyphrase() : '';

        if ( typeof description === 'string' ) {
            meta._yoast_wpseo_metadesc = description;
        }
        if ( typeof title === 'string' ) {
            meta._yoast_wpseo_title = title;
        }
        if ( typeof focus === 'string' ) {
            meta._yoast_wpseo_focuskw = focus;
        }

        if ( Object.keys( meta ).length ) {
            editorDispatch.editPost( { meta } );
        }
    }

    subscribe( function() {
        const editorSelect = select( 'core/editor' );
        const editPostSelect = select( 'core/edit-post' );
        const editPostDispatch = dispatch( 'core/edit-post' );

        if ( ! editorSelect ) {
            return;
        }

        if ( ! metaBoxesInitAttempted && editPostSelect && editPostDispatch ) {
            const isEditorReady = editorSelect.__unstableIsEditorReady
                ? editorSelect.__unstableIsEditorReady()
                : true;

            if (
                isEditorReady &&
                editPostSelect.areMetaBoxesInitialized &&
                ! editPostSelect.areMetaBoxesInitialized() &&
                editPostDispatch.initializeMetaBoxes
            ) {
                editPostDispatch.initializeMetaBoxes();
            }

            if ( isEditorReady ) {
                metaBoxesInitAttempted = true;
            }
        }

        const isSaving = editorSelect.isSavingPost ? editorSelect.isSavingPost() : false;
        const isAutosaving = editorSelect.isAutosavingPost ? editorSelect.isAutosavingPost() : false;

        if ( isSaving && ! isAutosaving && ! wasSavingPost ) {
            syncYoastMetaToEditor();
        }

        wasSavingPost = isSaving;
    } );
} )( window.wp );
JS;

    wp_add_inline_script('wp-edit-post', $script);
}
