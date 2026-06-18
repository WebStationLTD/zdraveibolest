<?php
/**
 * Plugin Name: Zdravei Yoast Editor Fix
 * Description: Ensures Yoast SEO meta descriptions persist when saving from the block editor.
 * Version: 1.0.0
 * Author: Cursor
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('enqueue_block_editor_assets', 'zdravei_yoast_editor_metabox_hotfix');
function zdravei_yoast_editor_metabox_hotfix() {
    $initializer = <<<'JS'
( ( { dispatch, select, subscribe } ) => {
    const unsub = subscribe( () => {
        const editorStore = select( 'core/editor' );
        const editPostStore = select( 'core/edit-post' );
        if ( ! editorStore || ! editPostStore ) {
            return;
        }

        const isEditorReady = editorStore.__unstableIsEditorReady
            ? editorStore.__unstableIsEditorReady()
            : true;
        const isInitialized = editPostStore.areMetaBoxesInitialized
            ? editPostStore.areMetaBoxesInitialized()
            : true;

        if ( isEditorReady ) {
            if ( isInitialized ) {
                unsub();
            } else if ( dispatch( 'core/edit-post' ).initializeMetaBoxes ) {
                dispatch( 'core/edit-post' ).initializeMetaBoxes();
            }
        }
    } );
} )( wp.data );
JS;

    wp_add_inline_script('wp-edit-post', $initializer);
}

add_action('init', 'zdravei_register_yoast_rest_meta');
function zdravei_register_yoast_rest_meta() {
    $post_types = array('post', 'page', 'services', 'members');
    $keys = array('_yoast_wpseo_focuskw', '_yoast_wpseo_title', '_yoast_wpseo_metadesc');

    foreach ($post_types as $post_type) {
        if (!post_type_exists($post_type)) {
            continue;
        }

        foreach ($keys as $key) {
            register_post_meta($post_type, $key, array(
                'type'              => 'string',
                'single'            => true,
                'show_in_rest'      => true,
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback'     => function () {
                    return current_user_can('edit_posts');
                },
            ));
        }
    }
}
