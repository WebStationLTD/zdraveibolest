<?php

// ============================================
// BYPASS JWT PLUGIN + CORS SUPPORT
// ============================================

// 1. CORS SUPPORT Ð·Ð° X-Auth-Token header
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    
    add_filter('rest_pre_serve_request', function($served) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization');
        header('Access-Control-Allow-Credentials: true');
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(200);
            exit;
        }
        
        return $served;
    });
}, 15);

// 2. Ð”Ð•ÐÐšÐ¢Ð˜Ð’Ð˜Ð ÐÐÐ• ÐÐ JWT PLUGIN Ð—Ð ÐÐÐ¨Ð˜Ð¢Ð• ENDPOINTS
add_filter('determine_current_user', function($user) {
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    
    $our_endpoints = [
        '/wp-json/zdravei/v1/validate',
        '/wp-json/zdravei/v1/update-profile',
        '/wp-json/zdravei/v1/clinical-trial-inquiry',
        '/wp-json/zdravei/v1/register',
        '/wp-json/zdravei/v1/login',
    ];
    
    foreach ($our_endpoints as $endpoint) {
        if (strpos($request_uri, $endpoint) !== false) {
            return $user;
        }
    }
    
    return $user;
}, 5);

// 3. ÐŸÑ€ÐµÐ¼Ð°Ñ…Ð²Ð°Ð½Ðµ Ð½Ð° JWT Ð¿Ð»ÑŠÐ³Ð¸Ð½ hooks
add_action('rest_api_init', function() {
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    
    $our_endpoints = [
        '/wp-json/zdravei/v1/validate',
        '/wp-json/zdravei/v1/update-profile',
        '/wp-json/zdravei/v1/clinical-trial-inquiry',
    ];
    
    foreach ($our_endpoints as $endpoint) {
        if (strpos($request_uri, $endpoint) !== false) {
            remove_filter('rest_pre_dispatch', 'jwt_auth_validate_token', 10);
            remove_filter('determine_current_user', 'jwt_auth_get_user', 10);
            break;
        }
    }
}, 1);

include('custom-shortcodes.php');





/* Block theme */

/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package FSE
 * @since 1.0.0
 */

/**
 * Enqueue the style.css file.
 *
 * @since 1.0.0
 */
function fse_styles() {
	wp_enqueue_style(
		'fse-style',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'fse_styles' );

if ( ! function_exists( 'fse_setup' ) ) {
	function fse_setup() {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'block-templates' );
		add_theme_support( 'block-template-parts' );
	}
}
add_action( 'after_setup_theme', 'fse_setup' );

/* END Block theme */

/* ****************************************************************************************** Add microdata ****************************************************************************************** */

function add_extended_json_ld_schema() {
	?>
	<script type="application/ld+json">
	{
			"@context": "http://schema.org",
			"@type": "Organization",
			"name": "Ð˜Ð¼Ðµ Ð½Ð° ÐšÐ¾Ð¼Ð¿Ð°Ð½Ð¸ÑÑ‚Ð°",
			"url": "https://www.website.com",
			"logo": "https://www.website.com/logo.png",
			"contactPoint": [{
					"@type": "ContactPoint",
					"telephone": "+359-123-456-789",
					"contactType": "ÐšÐ»Ð¸ÐµÐ½Ñ‚ÑÐºÐ¾ Ð¾Ð±ÑÐ»ÑƒÐ¶Ð²Ð°Ð½Ðµ",
					"areaServed": "BG",
					"availableLanguage": ["Bulgarian", "English"]
			}],
			"sameAs": [
					"https://www.facebook.com/yourprofile",
					"https://www.twitter.com/yourprofile",
					"https://www.linkedin.com/yourprofile",
					"https://www.instagram.com/yourprofile"
			],
			"founder": "Ð˜Ð¼Ðµ Ð½Ð° ÐžÑÐ½Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ",
			"foundingDate": "2000-01-01",
			"address": {
					"@type": "PostalAddress",
					"streetAddress": "Ð£Ð»Ð¸Ñ†Ð° Ð¸ Ð½Ð¾Ð¼ÐµÑ€",
					"addressLocality": "Ð“Ñ€Ð°Ð´",
					"addressRegion": "Ð ÐµÐ³Ð¸Ð¾Ð½",
					"postalCode": "ÐŸÐ¾Ñ‰ÐµÐ½ÑÐºÐ¸ ÐºÐ¾Ð´",
					"addressCountry": "BG"
			}
	},
	{
			"@type": "WebSite",
			"name": "Ð˜Ð¼Ðµ Ð½Ð° Ð¡Ð°Ð¹Ñ‚Ð°",
			"url": "https://www.website.com",
			"potentialAction": {
					"@type": "SearchAction",
					"target": "https://www.website.com/?s={search_term_string}",
					"query-input": "required name=search_term_string"
			}
	}
	</script>
	<?php
}

add_action('wp_footer', 'add_extended_json_ld_schema');

function add_local_business_schema() {
	if(is_front_page()) { // ÐŸÑ€Ð¾Ð²ÐµÑ€ÑÐ²Ð° Ð´Ð°Ð»Ð¸ Ðµ Ð½Ð°Ñ‡Ð°Ð»Ð½Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°
			?>
			<script type="application/ld+json">
			{
					"@context": "http://schema.org",
					"@type": "LocalBusiness",
					"name": "Ð˜Ð¼Ðµ Ð½Ð° Ð‘Ð¸Ð·Ð½ÐµÑÐ°",
					"address": {
							"@type": "PostalAddress",
							"streetAddress": "Ð£Ð»Ð¸Ñ†Ð° Ð¸ Ð½Ð¾Ð¼ÐµÑ€",
							"addressLocality": "Ð“Ñ€Ð°Ð´",
							"addressRegion": "Ð ÐµÐ³Ð¸Ð¾Ð½",
							"postalCode": "ÐŸÐ¾Ñ‰ÐµÐ½ÑÐºÐ¸ ÐºÐ¾Ð´",
							"addressCountry": "BG"
					},
					"telephone": "+359-123-456-789",
					"openingHours": "Mo-Fr 09:00-17:00",
					"priceRange": "$$-$$$",
					"image": "https://www.website.com/image-of-business.jpg",
					"url": "https://www.website.com"
			}
			</script>
			<?php
	}
}

add_action('wp_footer', 'add_local_business_schema');

//Get author url
function custom_get_author_posts_url($author_id) {
	return home_url('/') . 'author/' . get_the_author_meta('user_nicename', $author_id);
}

function add_article_schema() {
	if(is_single()) { 
			global $post;
			?>
			<script type="application/ld+json">
			{
					"@context": "http://schema.org",
					"@type": "Article",
					"headline": "<?php the_title(); ?>",
					"image": "<?php the_post_thumbnail_url(); ?>",
					"author": {
							"@type": "Person",
							"name": "<?php the_author(); ?>",
							"url": "<?php echo custom_get_author_posts_url(get_the_author_meta('ID')); ?>"
					},
					"url": "<?php echo get_permalink(); ?>",
					"datePublished": "<?php echo get_the_date('c'); ?>",
					"dateModified": "<?php echo get_the_modified_date('c'); ?>"
			}
			</script>
			<?php
	}
}

add_action('wp_footer', 'add_article_schema');

function add_social_media_posting_schema() {
	if(is_single() && 'post' == get_post_type()) { // ÐŸÑ€Ð¾Ð²ÐµÑ€ÑÐ²Ð° Ð´Ð°Ð»Ð¸ Ðµ Ð±Ð»Ð¾Ð³ Ð¿Ð¾ÑÑ‚
			?>
			<script type="application/ld+json">
			{
					"@context": "http://schema.org",
					"@type": "SocialMediaPosting",
					"headline": "<?php the_title(); ?>",
					"image": "<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>",
					"url": "<?php echo get_permalink(); ?>",
					"datePublished": "<?php echo get_the_date('c'); ?>",
					"dateModified": "<?php echo get_the_modified_date('c'); ?>",
					"author": {
							"@type": "Person",
							"name": "<?php the_author(); ?>",
							"url": "<?php echo custom_get_author_posts_url(get_the_author_meta('ID')); ?>"
					},
					"publisher": {
							"@type": "Organization",
							"name": "Ð˜Ð¼Ðµ Ð½Ð° ÐšÐ¾Ð¼Ð¿Ð°Ð½Ð¸ÑÑ‚Ð°/Ð˜Ð·Ð´Ð°Ñ‚ÐµÐ»Ñ",
							"logo": {
									"@type": "ImageObject",
									"url": "https://www.website.com/logo.png"
							}
					},
					"mainEntityOfPage": {
							"@type": "WebPage",
							"@id": "<?php echo get_permalink(); ?>"
					},
					"articleSection": "<?php echo implode(', ', wp_list_pluck(get_the_category(), 'name')); ?>",
					"wordCount": "<?php echo str_word_count( strip_tags( get_post_field( 'post_content', get_the_ID() ) ) ); ?>",
					"sharedContent": {
							"@type": "CreativeWork",
							"url": "<?php echo get_permalink(); ?>"
					}
			}
			</script>
			<?php
	}
}

add_action('wp_footer', 'add_social_media_posting_schema');

/* IF WE HAVE WOOCOMMERCE */

if ( class_exists( 'WooCommerce' ) ) {
	function add_product_schema() {
		if(is_product()) { // ÐŸÑ€Ð¾Ð²ÐµÑ€ÑÐ²Ð° Ð´Ð°Ð»Ð¸ Ðµ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð½Ð° Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚ (WooCommerce)
				global $product;

				$product_data = array(
						"@context" => "http://schema.org/",
						"@type" => "Product",
						"name" => $product->get_name(),
						"image" => wp_get_attachment_url( $product->get_image_id() ),
						"description" => $product->get_description(),
						"sku" => $product->get_sku(),
						"brand" => array(
								"@type" => "Brand",
								"name" => "Ð˜Ð¼Ðµ Ð½Ð° ÐœÐ°Ñ€ÐºÐ°Ñ‚Ð°" // Ð—Ð°Ð¼ÐµÐ½ÐµÑ‚Ðµ ÑÑŠÑ ÑÑ‚Ð¾Ð¹Ð½Ð¾ÑÑ‚, Ð°ÐºÐ¾ Ðµ Ð½Ð°Ð»Ð¸Ñ‡Ð½Ð°
						),
						"offers" => array(
								"@type" => "Offer",
								"priceCurrency" => "BGN", // Ð—Ð°Ð¼ÐµÐ½ÐµÑ‚Ðµ Ñ Ð²Ð°Ð»ÑƒÑ‚Ð°Ñ‚Ð° Ð½Ð° ÑÐ°Ð¹Ñ‚Ð°
								"price" => $product->get_price(),
								"itemCondition" => "http://schema.org/NewCondition", // ÐŸÑ€Ð¾Ð¼ÐµÐ½ÐµÑ‚Ðµ ÑÑŠÑÑ‚Ð¾ÑÐ½Ð¸ÐµÑ‚Ð¾, Ð°ÐºÐ¾ Ðµ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ð¾
								"availability" => "http://schema.org/InStock", // ÐŸÑ€Ð¾Ð¼ÐµÐ½ÐµÑ‚Ðµ Ð½Ð°Ð»Ð¸Ñ‡Ð½Ð¾ÑÑ‚Ñ‚Ð°, Ð°ÐºÐ¾ Ðµ Ñ€Ð°Ð·Ð»Ð¸Ñ‡Ð½Ð°
								"url" => get_permalink( $product->get_id() )
						)
				);

				if ( $product->get_average_rating() ) {
						$product_data['aggregateRating'] = array(
								"@type" => "AggregateRating",
								"ratingValue" => $product->get_average_rating(),
								"reviewCount" => $product->get_review_count()
						);
				}

				echo '<script type="application/ld+json">' . json_encode($product_data) . '</script>';
		}
	}

	add_action('wp_footer', 'add_product_schema');

}

/* END IF WE HAVE WOOCOMMERCE */

/* ****************************************************************************************** END Add microdata ****************************************************************************************** */

/* Allow SVG upload */

function allow_svg_upload($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');

function check_svg_mime_type($data, $file, $filename, $mimes) {
	$filetype = wp_check_filetype($filename, $mimes);
	if (in_array($filetype['type'], ['image/svg', 'image/svg+xml'], true)) {
			$data['ext'] = 'svg';
			$data['type'] = 'image/svg+xml';
	}
	return $data;
}
add_filter('wp_check_filetype_and_ext', 'check_svg_mime_type', 10, 4);

function svg_meta_data($data, $id) {
	$attachment = get_post($id);
	$mime_type = $attachment->post_mime_type;

	if ($mime_type === 'image/svg+xml') {
			$svg_path = get_attached_file($id);
			$svg_file = file_get_contents($svg_path);

			if ($svg_file) {
					$xml = simplexml_load_string($svg_file);
					$attributes = $xml->attributes();
					$width = (string) $attributes->width;
					$height = (string) $attributes->height;

					$data['width'] = intval($width);
					$data['height'] = intval($height);
			}
	}
	return $data;
}
add_filter('wp_generate_attachment_metadata', 'svg_meta_data', 10, 2);

/* END Allow SVG upload */

/* Add header icons - wishlist, cart and login inside mobile menu */

// Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð¼ÐµÐ½ÑŽÑ‚Ð¾
function register_my_menus() {
	register_nav_menus(array(
			'header' => 'Custom Primary Menu',
	));
}
add_action('init', 'register_my_menus');

// Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° JavaScript Ð·Ð° Ð¿Ñ€ÐµÐ¼ÐµÑÑ‚Ð²Ð°Ð½Ðµ Ð½Ð° ÑˆÐ¾Ñ€Ñ‚ÐºÐ¾Ð´Ð°
function add_custom_script() {
	// Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° ÑÐºÑ€Ð¸Ð¿Ñ‚Ð°
	wp_register_script('custom_script', false);
	wp_enqueue_script('custom_script');

	// ÐŸÐ¾Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° ÑˆÐ¾Ñ€Ñ‚ÐºÐ¾Ð´Ð° ÐºÑŠÐ¼ JavaScript
	wp_localize_script('custom_script', 'shortcodeData', array(
			'shortcode' => do_shortcode('[login_signup_buttons]')
	));
	
	// Ð˜Ð½Ð»Ð°Ð¹Ð½ JavaScript ÐºÐ¾Ð´
	wp_add_inline_script('custom_script', "
			document.addEventListener('DOMContentLoaded', function() {
					console.log('DOM fully loaded and parsed');

					function moveShortcode() {
							var menu = document.querySelector('.wp-block-navigation__responsive-container-content ul.wp-block-navigation');

							console.log('menu:', menu);

							if (window.innerWidth < 790) {
									if (menu) {
											// ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð´Ð°Ð»Ð¸ ÐµÐ»ÐµÐ¼ÐµÐ½Ñ‚ÑŠÑ‚ Ð²ÐµÑ‡Ðµ ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð°
											var existingItem = document.querySelector('.shortcode-container');
											if (!existingItem) {
													// Ð¡ÑŠÐ·Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ð½Ð¾Ð² <li> ÐµÐ»ÐµÐ¼ÐµÐ½Ñ‚
													var newItem = document.createElement('li');
													newItem.className = 'menu-item shortcode-container';
													newItem.innerHTML = shortcodeData.shortcode; // Ð’ÐºÐ°Ñ€Ð²Ð°Ð¼Ðµ ÑˆÐ¾Ñ€Ñ‚ÐºÐ¾Ð´Ð° Ð¾Ñ‚ PHP
													menu.appendChild(newItem);
													console.log('Shortcode added to menu');
											}
									}
							} else {
									// ÐœÐ°Ñ…Ð°Ð¼Ðµ ÐµÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð°, Ð°ÐºÐ¾ Ð²ÐµÑ‡Ðµ Ðµ Ð´Ð¾Ð±Ð°Ð²ÐµÐ½
									var existingItem = document.querySelector('.shortcode-container');
									if (existingItem) {
											existingItem.remove();
											console.log('Shortcode removed from menu');
									}
							}
					}

					moveShortcode();
					window.addEventListener('resize', moveShortcode);
			});
	");
}
add_action('wp_footer', 'add_custom_script');

/* END Add header icons - wishlist, cart and login inside mobile menu */

/* Add customizer.php */

add_action( 'customize_register', '__return_true' );

/* END Add customizer.php */

/* Toggle product filters mobile */

function filters_js() {
	?>
	<script>
	function toggleFilters() {
			var filters = document.querySelector('.filter-group');
			var button = document.querySelector('.show-filters-btn');
			
			if (filters.style.display === "none" || filters.style.display === "") {
					filters.style.display = "block";
					button.textContent = "-";
			} else {
					filters.style.display = "none";
					button.textContent = "+";
			}
	}
	
	</script>
	<?php
	}
	add_action('wp_footer', 'filters_js');

/* END Toggle product filters mobile */

/* Add FAQ functions */

function custom_faq_question_shortcode($atts, $content = null) {
	extract(shortcode_atts(array(
			"title" => 'Ð’ÑŠÐ¿Ñ€Ð¾Ñ'
	), $atts));

	return '<div class="faq-question">
						<div class="faq-accordion-title">' . esc_html($title) . '</div>
						<div class="faq-accordion-content">
								<div class="faq-accordion-content-inner">' . do_shortcode($content) . '</div>
						</div>
					</div>';

}
add_shortcode('faq_question', 'custom_faq_question_shortcode');

function add_faq_js() {
	?>
	<script type="text/javascript">
		document.addEventListener('DOMContentLoaded', function () {
				const accordionTitles = document.querySelectorAll('.faq-accordion-title');

				accordionTitles.forEach(title => {
						title.addEventListener('click', function() {
								this.classList.toggle('active');
								var content = this.nextElementSibling;
								if (content.style.maxHeight){
										content.style.maxHeight = null;
								} else {
										content.style.maxHeight = content.scrollHeight + "px";
								} 
						});
				});

		});
	</script>
	<?php
}
add_action('wp_footer', 'add_faq_js');

//Using
/*
[faq_question title="Ð’ÑŠÐ¿Ñ€Ð¾Ñ 1?"]ÐžÑ‚Ð³Ð¾Ð²Ð¾Ñ€ 1[/faq_question]
[faq_question title="Ð’ÑŠÐ¿Ñ€Ð¾Ñ 2?"]ÐžÑ‚Ð³Ð¾Ð²Ð¾Ñ€ 2[/faq_question]
[faq_question title="Ð’ÑŠÐ¿Ñ€Ð¾Ñ 3?"]ÐžÑ‚Ð³Ð¾Ð²Ð¾Ñ€ 3[/faq_question]
*/

/* END Add FAQ functions */

/* Automatic add image name to alt and convert if latin to cyrillic */
/*
function auto_set_image_alt( $post_ID ) {
	if ( wp_attachment_is_image( $post_ID ) ) {
			$file_name = get_post( $post_ID )->post_title;

			// Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð·Ð° ÐºÐ¾Ð½Ð²ÐµÑ€Ñ‚Ð¸Ñ€Ð°Ð½Ðµ Ð¾Ñ‚ Ð»Ð°Ñ‚Ð¸Ð½Ð¸Ñ†Ð° Ð½Ð° ÐºÐ¸Ñ€Ð¸Ð»Ð¸Ñ†Ð°
			$file_name = convert_to_cyrillic($file_name);

			// Ð—Ð°Ð¼ÐµÐ½ÑÐ¼Ðµ Ñ‚Ð¸Ñ€ÐµÑ‚Ð°Ñ‚Ð° Ñ Ð¸Ð½Ñ‚ÐµÑ€Ð²Ð°Ð»Ð¸
			$alt_text = str_replace( '-', ' ', $file_name );

			update_post_meta( $post_ID, '_wp_attachment_image_alt', $alt_text );
	}
}

function convert_to_cyrillic($text) {
	$latin = ['a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'sht', 'yu', 'ya', 'A', 'B', 'V', 'G', 'D', 'E', 'Zh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'Ts', 'Ch', 'Sh', 'Sht', 'Yu', 'Ya'];
	$cyrillic = ['Ð°', 'Ð±', 'Ð²', 'Ð³', 'Ð´', 'Ðµ', 'Ð¶', 'Ð·', 'Ð¸', 'Ð¹', 'Ðº', 'Ð»', 'Ð¼', 'Ð½', 'Ð¾', 'Ð¿', 'Ñ€', 'Ñ', 'Ñ‚', 'Ñƒ', 'Ñ„', 'Ñ…', 'Ñ†', 'Ñ‡', 'Ñˆ', 'Ñ‰', 'ÑŽ', 'Ñ', 'Ð', 'Ð‘', 'Ð’', 'Ð“', 'Ð”', 'Ð•', 'Ð–', 'Ð—', 'Ð˜', 'Ð™', 'Ðš', 'Ð›', 'Ðœ', 'Ð', 'Ðž', 'ÐŸ', 'Ð ', 'Ð¡', 'Ð¢', 'Ð£', 'Ð¤', 'Ð¥', 'Ð¦', 'Ð§', 'Ð¨', 'Ð©', 'Ð®', 'Ð¯'];

	return str_replace($latin, $cyrillic, $text);
}

add_action( 'add_attachment', 'auto_set_image_alt' );
*/
/* END Automatic add image name to alt and convert if latin to cyrillic */

/* Add table of content functions */

function add_toc_script() {
	echo "<script>
	document.addEventListener('DOMContentLoaded', function() {
    var tocList = document.getElementById('toc_list');
    if (!tocList) return;

    var containers = document.querySelectorAll('.entry-content, .content-column');
    if (!containers.length) return;

    var index = 0;
    containers.forEach(function(container) {
        var headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(function(heading) {
            var anchor = 'heading_' + index++;
            heading.id = anchor;

            var tocItem = document.createElement('li');
            var tocLink = document.createElement('a');
            tocLink.href = '#' + anchor;
            tocLink.textContent = heading.textContent;

            tocLink.addEventListener('click', function(event) {
                event.preventDefault();
                var scrollPosition = document.querySelector('#' + anchor).offsetTop - 100;
                window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            });

            tocItem.appendChild(tocLink);
            tocList.appendChild(tocItem);
        });
    });

    // ÐžÐ±ÐµÐ´Ð¸Ð½ÐµÐ½ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸Ðº Ð·Ð° ÑÑŠÐ±Ð¸Ñ‚Ð¸Ñ
    var tocTitle = document.getElementById('toc_title');
    tocTitle.addEventListener('click', function(event) {
        event.preventDefault(); // ÐŸÑ€ÐµÐ´Ð¾Ñ‚Ð²Ñ€Ð°Ñ‚ÑÐ²Ð° ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ð¾Ñ‚Ð¾ Ð¿Ð¾Ð²ÐµÐ´ÐµÐ½Ð¸Ðµ
        this.classList.toggle('active');
        tocList.classList.toggle('toc_list_hidden');
    });
});
	</script>";
}

add_action('wp_footer', 'add_toc_script');

function generate_empty_toc_container() {
	return '<div id="toc_container">
							<p class="toc_title" id="toc_title">Ð¡ÑŠÐ´ÑŠÑ€Ð¶Ð°Ð½Ð¸Ðµ</p>
							<ul id="toc_list" class="toc_list_hidden"></ul>
					</div>';
}

add_shortcode('custom_toc', 'generate_empty_toc_container');

//TEMPORARY TEST SHORTCODE INSIDE NEW BLOCK THEME TEMPLATES FIX
function parse_inner_blocks(&$parsed_block)
{
    if (isset($parsed_block['innerBlocks'])) {
        foreach ($parsed_block['innerBlocks'] as $key => &$inner_block) {
            if (!empty($inner_block['innerContent'])) {
                foreach ($inner_block['innerContent'] as &$inner_content) {
                    if (empty($inner_content)) {
                        continue;
                    }

                    $inner_content = do_shortcode($inner_content);
                }
            }
            if (isset($inner_block['innerBlocks'])) {
                $inner_block = parse_inner_blocks($inner_block);
            }
        }
    }

    return $parsed_block;
}

add_filter('render_block_data', function ($parsed_block) {

    if (isset($parsed_block['innerContent'])) {
        foreach ($parsed_block['innerContent'] as &$inner_content) {
            if (empty($inner_content)) {
                continue;
            }

            $inner_content = do_shortcode($inner_content);
        }
    }

    $parsed_block = parse_inner_blocks($parsed_block);

    return $parsed_block;
}, 10, 1);

/* END Add table of content functions */

/* Adding Breadcrumbs shortcode */

function custom_breadcrumbs() {
	// ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸
	$separator = ' <span class="separator">â€º</span> ';
	$home_title = 'ÐÐ°Ñ‡Ð°Ð»Ð¾';

	// ÐŸÐ¾Ð»ÑƒÑ‡Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð·Ð° Ñ‚ÐµÐºÑƒÑ‰Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°
	global $post;
	$home_url = home_url();
	$post_type = get_post_type();

	// ÐÐ°Ñ‡Ð°Ð»Ð¾ Ð½Ð° breadcrumbs
	$breadcrumbs = '<ul id="breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">';
	$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
	$breadcrumbs .= '<a itemprop="item" href="' . $home_url . '" aria-label="Breadcrumb button">';
	$breadcrumbs .= '<span itemprop="name">' . $home_title . '</span></a>';
	$breadcrumbs .= '<meta itemprop="position" content="1" /></li>';

	// Ð—Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸, Ð¾ÑÐ²ÐµÐ½ Ð½Ð°Ñ‡Ð°Ð»Ð½Ð°Ñ‚Ð°
	if (!is_front_page()) {

			$position = 2;
			$has_post_title = false;

			// ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð·Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð° Ð½Ð° Ð±Ð»Ð¾Ð³Ð°
			if (is_home() && !is_front_page()) {
					$blog_page_id = get_option('page_for_posts');
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">' . get_the_title($blog_page_id) . '</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
			}

			// ÐÐºÐ¾ Ðµ Ð°Ñ€Ñ…Ð¸Ð² Ð½Ð° Ñ‚Ð°ÐºÑÐ¾Ð½Ð¾Ð¼Ð¸Ñ
			if (is_tax()) {
					$term = get_queried_object();
					$taxonomy = get_taxonomy($term->taxonomy);
					$post_type = $taxonomy->object_type[0];
					$post_type_object = get_post_type_object($post_type);
					$post_type_archive = get_post_type_archive_link($post_type);

					// Ð’Ñ€ÑŠÐ·ÐºÐ° ÐºÑŠÐ¼ Ð°Ñ€Ñ…Ð¸Ð²Ð° Ð½Ð° CPT
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<a itemprop="item" href="' . $post_type_archive . '" aria-label="Breadcrumb button">';
					$breadcrumbs .= '<span itemprop="name">' . $post_type_object->labels->name . '</span></a>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
					$position++;

					// Ð˜Ð¼Ðµ Ð½Ð° Ñ‚Ð°ÐºÑÐ¾Ð½Ð¾Ð¼Ð¸Ñ‡Ð½Ð¸Ñ Ñ‚ÐµÑ€Ð¼Ð¸Ð½
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">' . single_term_title('', false) . '</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
					$position++;
			}
			// ÐÐºÐ¾ Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°
			elseif (is_page()) {
					if ($post->post_parent) {
							// Ð Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑÐºÐ¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸
							$parent_id = $post->post_parent;
							$breadcrumbs_array = [];
							while ($parent_id) {
									$page = get_page($parent_id);
									$breadcrumbs_array[] = '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
									$breadcrumbs_array[] .= $separator;
									$breadcrumbs_array[] .= '<a itemprop="item" href="' . get_permalink($page->ID) . '" aria-label="Breadcrumb button">';
									$breadcrumbs_array[] .= '<span itemprop="name">' . get_the_title($page->ID) . '</span></a>';
									$breadcrumbs_array[] .= '<meta itemprop="position" content="' . $position . '" /></li>';
									$position++;
									$parent_id = $page->post_parent;
							}
							$breadcrumbs_array = array_reverse($breadcrumbs_array);
							foreach ($breadcrumbs_array as $breadcrumb) {
									$breadcrumbs .= $breadcrumb;
							}
					}
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">' . get_the_title() . '</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
			}
			// ÐÐºÐ¾ Ðµ ÐµÐ´Ð¸Ð½Ð¸Ñ‡Ð½Ð° Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð½Ð° CPT
			elseif (is_singular() && $post_type && !in_array($post_type, ['post', 'page'])) {
					$post_type_object = get_post_type_object($post_type);
					$post_type_archive = get_post_type_archive_link($post_type);

					// Ð’Ñ€ÑŠÐ·ÐºÐ° ÐºÑŠÐ¼ Ð°Ñ€Ñ…Ð¸Ð²Ð° Ð½Ð° CPT
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<a itemprop="item" href="' . $post_type_archive . '" aria-label="Breadcrumb button">';
					$breadcrumbs .= '<span itemprop="name">' . $post_type_object->labels->name . '</span></a>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
					$position++;

					// ÐŸÐ¾Ð»ÑƒÑ‡Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð¸
					$taxonomies = get_object_taxonomies($post_type, 'objects');
					$taxonomy_names = array_keys($taxonomies);

					if ($taxonomy_names) {
							$terms = wp_get_post_terms($post->ID, $taxonomy_names);
							if ($terms && !is_wp_error($terms)) {
									$term = current($terms);
									$term_link = get_term_link($term);

									$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
									$breadcrumbs .= $separator;
									$breadcrumbs .= '<a itemprop="item" href="' . $term_link . '" aria-label="Breadcrumb button">';
									$breadcrumbs .= '<span itemprop="name">' . $term->name . '</span></a>';
									$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
									$position++;
							}
					}

					// Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ð·Ð°Ð³Ð»Ð°Ð²Ð¸ÐµÑ‚Ð¾ Ð½Ð° Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸ÑÑ‚Ð°
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">' . get_the_title() . '</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
					$position++;
					$has_post_title = true;
			}
			// ÐÐºÐ¾ Ðµ ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ð° Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ
			elseif (is_single()) {
					$category = get_the_category();
					if ($category) {
							$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
							$breadcrumbs .= $separator;
							$breadcrumbs .= '<a itemprop="item" href="' . get_category_link($category[0]->term_id ) . '" aria-label="Breadcrumb button">';
							$breadcrumbs .= '<span itemprop="name">' . $category[0]->name . '</span></a>';
							$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
							$position++;
					}
					// Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ð·Ð°Ð³Ð»Ð°Ð²Ð¸ÐµÑ‚Ð¾ Ð½Ð° Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸ÑÑ‚Ð°
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">' . get_the_title() . '</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
					$position++;
					$has_post_title = true;
			}
			// ÐÑ€Ñ…Ð¸Ð²Ð¸ Ð¸ ÐºÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸Ð¸
			elseif (is_category()) {
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">' . single_cat_title('', false) . '</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
			}
			// Ð¢ÑŠÑ€ÑÐµÐ½Ðµ
			elseif (is_search()) {
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">Ð ÐµÐ·ÑƒÐ»Ñ‚Ð°Ñ‚Ð¸ Ð¾Ñ‚ Ñ‚ÑŠÑ€ÑÐµÐ½ÐµÑ‚Ð¾ Ð·Ð° "' . get_search_query() . '"</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
			}
			// ÐÑ€Ñ…Ð¸Ð²Ð¸
			elseif (is_archive() && !is_tax() && !is_category()) {
					$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$breadcrumbs .= $separator;
					$breadcrumbs .= '<span itemprop="name">' . post_type_archive_title('', false) . '</span>';
					$breadcrumbs .= '<meta itemprop="position" content="' . $position . '" /></li>';
			}
	}

	$breadcrumbs .= '</ul>';
	return $breadcrumbs;
}

// Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° ÑˆÐ¾Ñ€Ñ‚ÐºÐ¾Ð´
add_shortcode('custom_breadcrumbs', 'custom_breadcrumbs');

/* END Adding Breadcrumbs shortcode */

/* Add back to top function */

function add_back_to_top_button() {
	echo '<a href="#" aria-label="Back to top button" class="back-to-top" style="display: none;"><span class="skeletonblock-icons backtotop-skeletonblock"></span></a>';
	?>
	<script>
			// ÐšÐ¾Ð³Ð°Ñ‚Ð¾ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÑ‚ ÑÐºÑ€Ð¾Ð»Ð¸Ñ€Ð° Ð½Ð°Ð´Ð¾Ð»Ñƒ, Ð¿Ð¾ÐºÐ°Ð¶ÐµÑ‚Ðµ Ð±ÑƒÑ‚Ð¾Ð½Ð°
			window.onscroll = function() {
					var backToTopButton = document.querySelector(".back-to-top");
					if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
							backToTopButton.style.display = "block";
					} else {
							backToTopButton.style.display = "none";
					}
			};

			// Ð¡ÐºÑ€Ð¾Ð»Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð°Ð³Ð¾Ñ€Ðµ Ñ Ð¿Ð»Ð°Ð²Ð½Ð° Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸Ñ
			document.querySelector('.back-to-top').addEventListener('click', function(event) {
					event.preventDefault(); // ÐŸÑ€ÐµÐ´Ð¾Ñ‚Ð²Ñ€Ð°Ñ‚ÑÐ²Ð° ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ð¾Ñ‚Ð¾ Ð¿Ð¾Ð²ÐµÐ´ÐµÐ½Ð¸Ðµ Ð½Ð° Ð°Ð½ÐºÐµÑ€Ð°
					window.scrollTo({top: 0, behavior: 'smooth'});
			});
	</script>
	<?php
}

add_action('wp_footer', 'add_back_to_top_button');

/* END Add back to top function */

/* Add cookies function */

function add_cookie_consent_script() {
	?>
	<!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
	<script type="text/javascript">
			window.cookieconsent_options = {
					"message": "Ð¡Ð°Ð¹Ñ‚ÑŠÑ‚ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸",
					"dismiss": "Ð Ð°Ð·Ð±Ñ€Ð°Ñ…!",
					"learnMore": "Ð’Ð¸Ð¶Ñ‚Ðµ Ð¿Ð¾Ð²ÐµÑ‡Ðµ",
					"link": "/privacy-policy/",
					"theme": "dark-bottom"
			};
	</script>

	<script type="text/javascript" async src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.10/cookieconsent.min.js"></script>
	<!-- End Cookie Consent plugin -->
	<?php
}

add_action('wp_footer', 'add_cookie_consent_script');

/* END Add cookies function */

/* Add menu fix JS to footer */

function my_custom_footer_script() {
	?>
	<script type="text/javascript">
	jQuery(function ($) {
			jQuery(document).ready(function ($) {
					$(".wp-block-navigation-submenu__toggle").click(function (e) {
							e.stopPropagation();

							var submenu = $(this).next(".wp-block-navigation__submenu-container");
							if (submenu.is(":visible")) {
									submenu.slideUp();
							} else {
									submenu.slideDown();
							}
					});
			});
	});
	</script>
	<?php
}
add_action('wp_footer', 'my_custom_footer_script');

/* END Add menu fix JS to footer */

/* Add push to call button */

function add_custom_button_script() {
	echo '
	<a href="tel:+359XXXXXXXXX" aria-label="push to call button" class="pushToCall">
		<div class="skeletonblock-icons push-to-call-button"></div>
	</a>
	';
}
add_action('wp_footer', 'add_custom_button_script');

/* END Add push to call button */

/* Aside sticky column */

function add_sticky_script() {
	?>
	<script>
			document.addEventListener('DOMContentLoaded', () => {
					const aside = document.querySelector('.aside-sticky-column');
					if (aside) {
							window.addEventListener('scroll', () => {
									if (window.scrollY > 150) {
											aside.classList.add('sticky');
									} else {
											aside.classList.remove('sticky');
									}
							});
					}
			});
	</script>
	<?php
}

add_action('wp_footer', 'add_sticky_script');

/* END Aside sticky column */

/* Add aria-label to header and footer logo */

function add_aria_label_to_logos() {
	?>
	<script>
			document.addEventListener("DOMContentLoaded", function() {
					// Ð”Ð¾Ð±Ð°Ð²Ñ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð° aria-label ÐºÑŠÐ¼ Ð»Ð¾Ð³Ð¾Ñ‚Ð¾ Ð² Ñ…ÐµÐ´ÑŠÑ€Ð°
					var headerLogoLink = document.querySelector('.logo-column .wp-block-image a');
					if(headerLogoLink) {
							headerLogoLink.setAttribute('aria-label', 'Ð›Ð¾Ð³Ð¾');
					}

					// Ð”Ð¾Ð±Ð°Ð²Ñ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð° aria-label ÐºÑŠÐ¼ Ð»Ð¾Ð³Ð¾Ñ‚Ð¾ Ð²ÑŠÐ² Ñ„ÑƒÑ‚ÑŠÑ€Ð°
					var footerLogoLink = document.querySelector('.footer-logo-column .wp-block-image a');
					if(footerLogoLink) {
							footerLogoLink.setAttribute('aria-label', 'Ð›Ð¾Ð³Ð¾');
					}
			});
	</script>
	<?php
}
add_action('wp_footer', 'add_aria_label_to_logos');

/* END Add aria-label to header and footer logo	 */

/* Remove autp paragraphs */

remove_filter("the_content", "wpautop");
remove_filter("the_excerpt", "wpautop");

/* END Remove autp paragraphs */

/* Disable emojis */

function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' ); 
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' ); 
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
}
add_action( 'init', 'disable_emojis' );

function disable_emojis_tinymce( $plugins ) {
	if ( is_array( $plugins ) ) {
			return array_diff( $plugins, array( 'wpemoji' ) );
	} else {
			return array();
	}
}

/* END Disable emojis */

/* TEST SEE ALL CSS AND JS */

/*
add_action('wp_footer', 'list_queued_scripts');
function list_queued_scripts() {
    global $wp_scripts;
    foreach ($wp_scripts->queue as $script) {
        echo $script . ' ';
    }
}


add_action('wp_footer', 'list_queued_styles');

function list_queued_styles() {
    global $wp_styles;
    foreach ($wp_styles->queue as $style) {
        echo $style . ' ';
    }
}
*/

/* END TEST SEE ALL CSS AND JS */

/* Add image sizes */

add_image_size('index-posts-size', 487, 376, true);
add_image_size('sidebar-posts-size', 180, 139, true);

/* END Add image sizes */

/* REMOVE ONLY EMBEDS */

function disable_embeds_code_init()
{

	// Remove the REST API endpoint.
	remove_action('rest_api_init', 'wp_oembed_register_route');

	// Turn off oEmbed auto discovery.
	add_filter('embed_oembed_discover', '__return_false');

	// Don't filter oEmbed results.
	remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

	// Remove oEmbed discovery links.
	remove_action('wp_head', 'wp_oembed_add_discovery_links');

	// Remove oEmbed-specific JavaScript from the front-end and back-end.
	remove_action('wp_head', 'wp_oembed_add_host_js');
	add_filter('tiny_mce_plugins', 'disable_embeds_tiny_mce_plugin');

	// Remove all embeds rewrite rules.
	add_filter('rewrite_rules_array', 'disable_embeds_rewrites');

	// Remove filter of the oEmbed result before any HTTP requests are made.
	remove_filter('pre_oembed_result', 'wp_filter_pre_oembed_result', 10);
}

add_action('init', 'disable_embeds_code_init', 9999);

function disable_embeds_tiny_mce_plugin($plugins)
{
	return array_diff($plugins, array('wpembed'));
}

function disable_embeds_rewrites($rules)
{
	foreach ($rules as $rule => $rewrite) {
		if (false !== strpos($rewrite, 'embed=true')) {
			unset($rules[$rule]);
		}
	}
	return $rules;
}

/* END REMOVE ONLY EMBEDS */

/* Add fonts */

function theme_header_metadata()
{

?>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet preload" as="style">
<?php

}
add_action('wp_head', 'theme_header_metadata');

/* END Add fonts */

/* Enqueue styles and scripts */

function ScanWP_enqueue()
{
	wp_enqueue_style('style', get_template_directory_uri() . '/assets/css/swiper-bundle.min.css');
	wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/swiper-bundle.min.js');
	wp_enqueue_script('jqueryui', get_template_directory_uri() . '/assets/js/jquery-ui.min.js', array('jquery'), '', true);
	wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'ScanWP_enqueue');

/* END Enqueue styles and scripts */

/* Support title tag and thumbnails if needed */

//add_theme_support('title-tag');
add_theme_support('post-thumbnails');

/* END Support title tag and thumbnails if needed */

function ScanWP_widgets_init()
{

	register_sidebar(array(
		'name'          => 'Footer 1',
		'id'            => 'footer_1',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h6 class="ttl">',
		'after_title'   => '</h6>',
	));

	register_sidebar(array(
		'name'          => 'Footer 2',
		'id'            => 'footer_2',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h6 class="ttl">',
		'after_title'   => '</h6>',
	));

	register_sidebar(array(
		'name'          => 'Footer 3',
		'id'            => 'footer_3',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h6 class="ttl">',
		'after_title'   => '</h6>',
	));
	register_sidebar(array(
		'name'          => 'Footer 4',
		'id'            => 'footer_4',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h6 class="ttl">',
		'after_title'   => '</h6>',
	));
	register_sidebar(array(
		'name'          => 'sidebar',
		'id'            => 'sidebar',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h6 class="ttl">',
		'after_title'   => '</h6>',
	));
	register_sidebar(
		array(
			'name' => __('Custom', 'Skeleton'),
			'id' => 'custom-side-bar',
			'description' => __('Custom Sidebar', 'Skeleton'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget' => "</div>",
			'before_title' => '<h4 class="ttl">',
			'after_title' => '</h4>',
		)
	);
	register_sidebar(
		array(
			'name' => __('Custom Sidebar Blog', 'Skeleton'),
			'id' => 'custom-side-bar-blog',
			'description' => __('Custom Sidebar Blog', 'Skeleton'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget' => "</div>",
			'before_title' => '<h4 class="ttl">',
			'after_title' => '</h4>',
		)
	);
}
add_action('widgets_init', 'ScanWP_widgets_init');

/* CPT */

//Labeling
function xcompile_post_type_labels($singular = 'Post', $plural = 'Posts')
{
	$p_lower = strtolower($plural);
	$s_lower = strtolower($singular);

	return [
		'name' => $plural,
		'singular_name' => $singular,
		'add_new_item' => "New $singular",
		'edit_item' => "Edit $singular",
		'view_item' => "View $singular",
		'view_items' => "View $plural",
		'search_items' => "Search $plural",
		'not_found' => "No $p_lower found",
		'not_found_in_trash' => "No $p_lower found in trash",
		'parent_item_colon' => "Parent $singular",
		'all_items' => "All $plural",
		'archives' => "$singular Archives",
		'attributes' => "$singular Attributes",
		'insert_into_item' => "Insert into $s_lower",
		'uploaded_to_this_item' => "Uploaded to this $s_lower",
	];
}

//Change a Post Types Title Placeholder Text
add_filter('enter_title_here', function ($title) {
	$screen = get_current_screen();

	if ('service' == $screen->post_type) {
		$title = 'Enter name of the service here';
	}

	return $title;
});

//Adding a Help Tab to a Post Type
add_action('admin_head', function () {
	$screen = get_current_screen();

	if ('service' != $screen->post_type)
		return;

	$args = [
		'id'      => 'service_help',
		'title'   => 'Service Help',
		'content' => '<h3>Services</h3><p>Service for self storage.</p>',
	];

	$screen->add_help_tab($args);
});

//Messaging for Edit, Add, Bulk, and More.
//Single Post Messages
add_filter('post_updated_messages', function ($messages) {
	global $post, $post_ID;
	$link = esc_url(get_permalink($post_ID));

	$messages['service'] = array(
		0 => '',
		1 => sprintf(__('Service updated. <a href="%s">View service</a>'), $link),
		2 => __('Custom field updated.'),
		3 => __('Custom field deleted.'),
		4 => __('Service updated.'),
		5 => isset($_GET['revision']) ? sprintf(__('Service restored to revision from %s'), wp_post_revision_title((int) $_GET['revision'], false)) : false,
		6 => sprintf(__('Service published. <a href="%s">View service</a>'), $link),
		7 => __('Service saved.'),
		8 => sprintf(__('Service submitted. <a target="_blank" href="%s" rel="noopener noreferrer">Preview service</a>'), esc_url(add_query_arg('preview', 'true', get_permalink($post_ID)))),
		9 => sprintf(__('Service scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s" rel="noopener noreferrer">Preview service</a>'), date_i18n(__('M j, Y @ G:i'), strtotime($post->post_date)), $link),
		10 => sprintf(__('Service draft updated. <a target="_blank" href="%s" rel="noopener noreferrer">Preview service</a>'), esc_url(add_query_arg('preview', 'true', get_permalink($post_ID)))),
	);
	return $messages;
});

//Messaging for Edit, Add, Bulk, and More.
//Bulk Post Messages
add_filter('bulk_post_updated_messages', function ($bulk_messages, $bulk_counts) {
	$bulk_messages['service'] = array(
		'updated'   => _n("%s service updated.", "%s services updated.", $bulk_counts["updated"]),
		'locked'    => _n("%s service not updated, somebody is editing it.", "%s services not updated, somebody is editing them.", $bulk_counts["locked"]),
		'deleted'   => _n("%s service permanently deleted.", "%s services permanently deleted.", $bulk_counts["deleted"]),
		'trashed'   => _n("%s service moved to the Trash.", "%s services moved to the Trash.", $bulk_counts["trashed"]),
		'untrashed' => _n("%s service restored from the Trash.", "%s services restored from the Trash.", $bulk_counts["untrashed"]),
	);

	return $bulk_messages;
}, 10, 2);

/* Add cpt taxonomy */

add_action('init', function () {
	$type = 'service';
	$labels = xcompile_post_type_labels('Ð£ÑÐ»ÑƒÐ³Ð°', 'Ð£ÑÐ»ÑƒÐ³Ð¸');

	$arguments = [
		'taxonomies' => ['post_tag'], // And post tags
		//'register_meta_box_cb' => 'service_meta_box',
		'labels'  => $labels,
		'description' => 'Services cats.',
		'menu_icon' => 'dashicons-desktop',
		'public' => true,
		'has_archive' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'menu_position' => 2,
		'hierarchical' => false,
		'show_in_rest' => true,
		'rest_base' => 'services',
		'supports' => ['title', 'editor', 'revisions', 'page-attributes', 'thumbnail', 'excerpt'],
		'rewrite' => ['slug' => 'terapevtichni-oblasti']
	];

	register_post_type($type, $arguments);
});

/* END Add cpt taxonomy */

/* Create categories */

//Create categories
add_action('init', 'create_category_taxonomies', 0);

function create_category_taxonomies()
{
	$labels = array(
		'name' => _x('Service Categories', 'taxonomy general name'),
		'singular_name' => _x('ÐšÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸Ñ', 'taxonomy singular name'),
		'search_items' => __('Search Service Categories'),
		'popular_items' => __('Popular Service Categories'),
		'all_items' => __('All Service Categories'),
		'parent_item' => null,
		'parent_item_colon' => null,
		'edit_item' => __('Edit Service Category'),
		'update_item' => __('Update Service Category'),
		'add_new_item' => __('Add New Service Category'),
		'new_item_name' => __('New Service Category Name'),
		'separate_items_with_commas' => __('Separate service categories with commas'),
		'add_or_remove_items' => __('Add or remove service categories'),
		'choose_from_most_used' => __('Choose from the most used service categories'),
		'menu_name' => __('Service Categories'),
	);

	register_taxonomy('service_category', 'service', array(
		'hierarchical' => true,
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_in_rest' => true,
		'show_tagcloud' => true,
		'labels' => $labels,
		'update_count_callback' => '_update_post_term_count',
		'query_var' => true,
		'rewrite' => array('slug' => 'service-category'),
	));
}

/* END Create categories */

/* END CPT */

/* Fix excerpt length */

function my_excerpt_length($length)
{
	return 10;
}
add_filter('excerpt_length', 'my_excerpt_length');

/* Fix excerpt length */

/* Protected content */

/**
 * ============================================
 * ZDRAVEIBOLEST.BG - AUTHENTICATION SYSTEM
 * ============================================
 * 
 * Ð¢Ð¾Ð·Ð¸ ÐºÐ¾Ð´ Ñ‚Ñ€ÑÐ±Ð²Ð° Ð´Ð° ÑÐµ Ð´Ð¾Ð±Ð°Ð²Ð¸ Ð²ÑŠÐ² Ð²Ð°ÑˆÐ¸Ñ functions.php Ñ„Ð°Ð¹Ð»
 * Ð² WordPress Ñ‚ÐµÐ¼Ð°Ñ‚Ð° Ð¸Ð»Ð¸ Ð² custom plugin.
 * 
 * Ð’ÐÐ–ÐÐž: Ð¢Ñ€ÑÐ±Ð²Ð° Ð´Ð° Ð¸Ð½ÑÑ‚Ð°Ð»Ð¸Ñ€Ð°Ñ‚Ðµ JWT Authentication Plugin:
 * https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
 * 
 * ============================================
 */

// ============================================
// 1. CUSTOM USER META FIELD
// ============================================

/**
 * Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° custom field Ð·Ð° Ñ‚ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð° Ð¾Ð±Ð»Ð°ÑÑ‚ Ð² user meta
 */
add_action('user_register', 'save_therapeutic_area_on_register');
function save_therapeutic_area_on_register($user_id) {
    if (isset($_POST['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($_POST['therapeutic_area']));
    }
}

/**
 * Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ð¿Ð¾Ð»Ðµ Ð·Ð° Ñ‚ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð° Ð¾Ð±Ð»Ð°ÑÑ‚ Ð² Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð° Ð½Ð° Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»Ñ
 */
add_action('show_user_profile', 'show_therapeutic_area_field');
add_action('edit_user_profile', 'show_therapeutic_area_field');
function show_therapeutic_area_field($user) {
    $therapeutic_area = get_user_meta($user->ID, 'therapeutic_area', true);
    ?>
    <h3>Ð˜Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð·Ð° Ð·Ð´Ñ€Ð°Ð²Ðµ</h3>
    <table class="form-table">
        <tr>
            <th><label for="therapeutic_area">Ð¢ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð° Ð¾Ð±Ð»Ð°ÑÑ‚</label></th>
            <td>
                <input type="text" name="therapeutic_area" id="therapeutic_area" 
                       value="<?php echo esc_attr($therapeutic_area); ?>" 
                       class="regular-text" />
                <br />
                <span class="description">Ð¢ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð°Ñ‚Ð° Ð¾Ð±Ð»Ð°ÑÑ‚, Ð·Ð° ÐºÐ¾ÑÑ‚Ð¾ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÑ‚ Ð¿Ñ€Ð¾ÑÐ²ÑÐ²Ð° Ð¸Ð½Ñ‚ÐµÑ€ÐµÑ</span>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Ð—Ð°Ð¿Ð°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ñ‚ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð° Ð¾Ð±Ð»Ð°ÑÑ‚ Ð¿Ñ€Ð¸ Ñ€ÐµÐ´Ð°ÐºÑ†Ð¸Ñ Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»
 */
add_action('personal_options_update', 'save_therapeutic_area_field');
add_action('edit_user_profile_update', 'save_therapeutic_area_field');
function save_therapeutic_area_field($user_id) {
    if (!current_user_can('edit_user', $user_id)) {
        return false;
    }
    if (isset($_POST['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($_POST['therapeutic_area']));
    }
}

// ============================================
// 2. CUSTOM REST API ENDPOINTS
// ============================================

/**
 * Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° custom REST API endpoints
 */
add_action('rest_api_init', function () {
    
    // Register endpoint
    register_rest_route('zdravei/v1', '/register', array(
        'methods' => 'POST',
        'callback' => 'zdravei_register_user',
        'permission_callback' => '__return_true'
    ));
    
    // Login endpoint
    register_rest_route('zdravei/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'zdravei_login_user',
        'permission_callback' => '__return_true'
    ));
    
    // Validate token endpoint
    register_rest_route('zdravei/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'zdravei_validate_callback',
        'permission_callback' => '__return_true'
    ));
    
    // Create application endpoint
    register_rest_route('zdravei/v1', '/create-application', array(
        'methods' => 'POST',
        'callback' => 'zdravei_create_application',
        'permission_callback' => '__return_true'
    ));
    // Custom REST API endpoint
        register_rest_route( 'zdravei/v1', '/verify-email', array(
        'methods'             => 'GET',
        'callback'            => 'zdravei_verify_email_callback',
        'permission_callback' => '__return_true',
    ));
});

//Add callback functions - Custom REST API endpoint
function zdravei_verify_email_callback( WP_REST_Request $request ) {
    $token = sanitize_text_field( $request->get_param('token') );

    if ( empty($token) ) {
        return new WP_REST_Response( array('success' => false, 'message' => 'Ð›Ð¸Ð¿ÑÐ²Ð° Ñ‚Ð¾ÐºÐµÐ½.'), 400 );
    }

    // ÐÐ°Ð¼ÐµÑ€Ð¸ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ» Ñ Ñ‚Ð¾Ð·Ð¸ Ñ‚Ð¾ÐºÐµÐ½
    $users = get_users( array(
        'meta_key'   => 'email_verification_token',
        'meta_value' => $token,
        'number'     => 1,
    ));

    if ( empty($users) ) {
        return new WP_REST_Response( array('success' => false, 'message' => 'ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ð¸Ð»Ð¸ Ð¸Ð·Ñ‚ÐµÐºÑŠÐ» Ð»Ð¸Ð½Ðº Ð·Ð° Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ.'), 400 );
    }

    $user_id = $users[0]->ID;

    // ÐÐºÑ‚Ð¸Ð²Ð¸Ñ€Ð°Ð¹ Ð°ÐºÐ°ÑƒÐ½Ñ‚Ð°
    update_user_meta( $user_id, 'account_status', 'active' );
    delete_user_meta( $user_id, 'email_verification_token' );

    // Ð˜Ð·Ð¿Ñ€Ð°Ñ‚Ð¸ welcome Ð¸Ð¼ÐµÐ¹Ð» ÑÐ»ÐµÐ´ ÑƒÑÐ¿ÐµÑˆÐ½Ð° Ð²ÐµÑ€Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ
    $user      = get_userdata( $user_id );
    $username  = $user->user_login;
    $email     = $user->user_email;
    $login_url = 'https://zdraveibolest.bg/login';
    $subject = 'Ð”Ð¾Ð±Ñ€Ðµ Ð´Ð¾ÑˆÐ»Ð¸ Ð² â€žÐ—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚"!';
    $message  = "Ð—Ð´Ñ€Ð°Ð²ÐµÐ¹Ñ‚Ðµ, {$username},\n\n";
    $message .= "Ð Ð°Ð´Ð²Ð°Ð¼Ðµ ÑÐµ, Ñ‡Ðµ Ð²ÐµÑ‡Ðµ ÑÑ‚Ðµ Ñ‡Ð°ÑÑ‚ Ð¾Ñ‚ Ð¿Ð»Ð°Ñ‚Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ð° 'Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚' â€” Ð´Ð¾Ð±Ñ€Ðµ Ð´Ð¾ÑˆÐ»Ð¸! ðŸ˜Š\n\n";
    $message .= "Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ð’Ð¸ Ðµ ÑƒÑÐ¿ÐµÑˆÐ½Ð° Ð¸ Ð²ÐµÑ‡Ðµ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ ÑÐ¿Ð¾ÐºÐ¾Ð¹Ð½Ð¾ Ð´Ð° Ñ€Ð°Ð·Ð³Ð»ÐµÐ¶Ð´Ð°Ñ‚Ðµ Ð¸ Ð¾Ñ‚ÐºÑ€Ð¸Ð²Ð°Ñ‚Ðµ Ð¿Ð¾Ð»ÐµÐ·Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð² ÑÐ°Ð¹Ñ‚Ð°.\n\n";
    $message .= "Ð•Ñ‚Ð¾ ÐºÐ°ÐºÐ²Ð¾ Ð’Ð¸ Ð¾Ñ‡Ð°ÐºÐ²Ð° Ð¿Ñ€Ð¸ Ð½Ð°Ñ:\n\n";
    $message .= "â€¢ ÐŸÐ¾Ð´Ñ€Ð¾Ð±Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð·Ð° Ñ€Ð°Ð·Ð»Ð¸Ñ‡Ð½Ð¸ Ñ‚ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð¸ Ð¾Ð±Ð»Ð°ÑÑ‚Ð¸\n";
    $message .= "â€¢ Ð¡ÑŠÐ´ÑŠÑ€Ð¶Ð°Ð½Ð¸Ðµ, ÑÑŠÐ¾Ð±Ñ€Ð°Ð·ÐµÐ½Ð¾ Ñ Ð’Ð°ÑˆÐ¸Ñ‚Ðµ Ð¸Ð½Ñ‚ÐµÑ€ÐµÑÐ¸\n";
    $message .= "â€¢ ÐÐºÑ‚ÑƒÐ°Ð»Ð½Ð¸ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚Ð¸ Ð·Ð° ÑƒÑ‡Ð°ÑÑ‚Ð¸Ðµ Ð² ÐºÐ»Ð¸Ð½Ð¸Ñ‡Ð½Ð¸ Ð¸Ð·Ð¿Ð¸Ñ‚Ð²Ð°Ð½Ð¸Ñ\n";
    $message .= "â€¢ ÐŸÐ¾Ð»ÐµÐ·Ð½Ð¸ Ð¼Ð°Ñ‚ÐµÑ€Ð¸Ð°Ð»Ð¸ Ð¸ Ð½Ð°ÑÐ¾ÐºÐ¸ Ð¾Ñ‚ Ð»ÐµÐºÐ°Ñ€Ð¸ Ð¸ ÑÐ¿ÐµÑ†Ð¸Ð°Ð»Ð¸ÑÑ‚Ð¸\n\n";
    $message .= "Ð”ÐÐÐÐ˜ Ð—Ð Ð’Ð¥ÐžÐ”:\n\n";
    $message .= "ÐŸÐ¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ: {$username}\n";
    $message .= "Ð˜Ð¼ÐµÐ¹Ð»: {$email}\n";
    $message .= "Ð›Ð¸Ð½Ðº Ð·Ð° Ð²Ñ…Ð¾Ð´: {$login_url}\n\n";
    $message .= "ÐÐºÐ¾ Ð¸Ð¼Ð°Ñ‚Ðµ Ð²ÑŠÐ¿Ñ€Ð¾ÑÐ¸ Ð¸Ð»Ð¸ Ð¿Ñ€Ð¾ÑÑ‚Ð¾ Ð¸ÑÐºÐ°Ñ‚Ðµ Ð´Ð° ÑÐµ ÑÐ²ÑŠÑ€Ð¶ÐµÑ‚Ðµ Ñ Ð½Ð°Ñ, Ð½Ð°ÑÑ€ÐµÑ‰Ð° ÑÐ¼Ðµ Ð½Ð°: office@zdraveibolest.bg\n\n";
    $message .= "Ð©Ðµ ÑÐµ Ñ€Ð°Ð´Ð²Ð°Ð¼Ðµ Ð´Ð° Ð’Ð¸ Ð²Ð¸Ð¶Ð´Ð°Ð¼Ðµ Ð¾Ñ‚Ð½Ð¾Ð²Ð¾ Ð² ÑÐ°Ð¹Ñ‚Ð°!\n\n";
    $message .= "ÐŸÐ¾Ð·Ð´Ñ€Ð°Ð²Ð¸,\nÐ•ÐºÐ¸Ð¿ÑŠÑ‚ Ð½Ð° 'Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚'";
    wp_mail( $email, $subject, $message, array( 'Content-Type: text/plain; charset=UTF-8' ) );

    return new WP_REST_Response( array('success' => true, 'message' => 'Ð˜Ð¼ÐµÐ¹Ð»ÑŠÑ‚ Ðµ Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÐ½ ÑƒÑÐ¿ÐµÑˆÐ½Ð¾.'), 200 );
}

/**
 * Register User - Custom endpoint
 */
/*
function zdravei_register_user($request) {
    $parameters = $request->get_json_params();
    
    // Validation
    if (empty($parameters['username']) || empty($parameters['email']) || empty($parameters['password'])) {
        return new WP_Error('missing_fields', 'ÐœÐ¾Ð»Ñ, Ð¿Ð¾Ð¿ÑŠÐ»Ð½ÐµÑ‚Ðµ Ð²ÑÐ¸Ñ‡ÐºÐ¸ Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¸ Ð¿Ð¾Ð»ÐµÑ‚Ð°', array('status' => 400));
    }
    
    if (!is_email($parameters['email'])) {
        return new WP_Error('invalid_email', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ð¸Ð¼ÐµÐ¹Ð» Ð°Ð´Ñ€ÐµÑ', array('status' => 400));
    }
    
    if (username_exists($parameters['username'])) {
        return new WP_Error('username_exists', 'ÐŸÐ¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾Ñ‚Ð¾ Ð¸Ð¼Ðµ Ð²ÐµÑ‡Ðµ ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð°', array('status' => 400));
    }
    
    if (email_exists($parameters['email'])) {
        return new WP_Error('email_exists', 'Ð˜Ð¼ÐµÐ¹Ð»ÑŠÑ‚ Ð²ÐµÑ‡Ðµ Ðµ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½', array('status' => 400));
    }
    
    // Create user
    $user_id = wp_create_user(
        sanitize_user($parameters['username']),
        $parameters['password'],
        sanitize_email($parameters['email'])
    );
    
    if (is_wp_error($user_id)) {
        return $user_id;
    }
    
    // Update user meta
    if (!empty($parameters['first_name'])) {
        update_user_meta($user_id, 'first_name', sanitize_text_field($parameters['first_name']));
    }
    
    if (!empty($parameters['last_name'])) {
        update_user_meta($user_id, 'last_name', sanitize_text_field($parameters['last_name']));
    }
    
    if (!empty($parameters['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($parameters['therapeutic_area']));
    }
    
    // Generate JWT token
    $user = get_user_by('id', $user_id);
    $token = zdravei_generate_jwt_token($user);
    
    return array(
        'success' => true,
        'message' => 'Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ðµ ÑƒÑÐ¿ÐµÑˆÐ½Ð°',
        'token' => $token,
        'user' => array(
            'id' => $user_id,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user_id, 'first_name', true),
            'last_name' => get_user_meta($user_id, 'last_name', true),
            'therapeutic_area' => get_user_meta($user_id, 'therapeutic_area', true),
        )
    );
}
*/



// ============================================================
// Ð¤Ð£ÐÐšÐ¦Ð˜Ð¯ 1: Ð Ð•Ð“Ð˜Ð¡Ð¢Ð ÐÐ¦Ð˜Ð¯ ÐÐ ÐŸÐžÐ¢Ð Ð•Ð‘Ð˜Ð¢Ð•Ð›
// ============================================================

/*
function zdravei_register_user($request) {
    $parameters = $request->get_json_params();

    // Validate required fields
    if (empty($parameters['email']) || empty($parameters['password'])) {
        return new WP_Error(
            'missing_fields',
            'Email Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð° ÑÐ° Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¸',
            array('status' => 400)
        );
    }

    // Check if email already exists
    if (email_exists($parameters['email'])) {
        return new WP_Error(
            'email_exists',
            'Ð¢Ð¾Ð·Ð¸ email Ð²ÐµÑ‡Ðµ Ðµ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½',
            array('status' => 400)
        );
    }

    // Create user with email as username
    $user_data = array(
        'user_login' => $parameters['email'],
        'user_email' => $parameters['email'],
        'user_pass'  => $parameters['password'],
        'role'       => !empty($parameters['role']) ? $parameters['role'] : 'site_member'
    );

    // Add first_name and last_name if provided
    if (!empty($parameters['first_name'])) {
        $user_data['first_name'] = sanitize_text_field($parameters['first_name']);
    }
    if (!empty($parameters['last_name'])) {
        $user_data['last_name'] = sanitize_text_field($parameters['last_name']);
    }

    $user_id = wp_insert_user($user_data);

    if (is_wp_error($user_id)) {
        return new WP_Error(
            'registration_failed',
            'Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ð½Ðµ Ð±ÐµÑˆÐµ ÑƒÑÐ¿ÐµÑˆÐ½Ð°',
            array('status' => 500)
        );
    }

    // Save ACF fields with correct naming
    // Phone number - frontend Ð¸Ð·Ð¿Ñ€Ð°Ñ‰Ð° acf_phone_number
    if (!empty($parameters['acf_phone_number'])) {
        update_user_meta($user_id, 'acf_phone_number', sanitize_text_field($parameters['acf_phone_number']));
    }

    // Therapeutic area - frontend Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð¸Ð·Ð¿Ñ€Ð°Ñ‰Ð° Ñ Ð¸Ð»Ð¸ Ð±ÐµÐ· Ð¿Ñ€ÐµÑ„Ð¸ÐºÑ
    if (!empty($parameters['acf_therapeutic_area'])) {
        update_user_meta($user_id, 'acf_therapeutic_area', sanitize_text_field($parameters['acf_therapeutic_area']));
    } elseif (!empty($parameters['therapeutic_area'])) {
        update_user_meta($user_id, 'acf_therapeutic_area', sanitize_text_field($parameters['therapeutic_area']));
    }


    // Ð—Ð°Ð¿Ð¸ÑÐ²Ð°Ð½Ðµ Ð½Ð° Ð¸Ð·Ð±Ñ€Ð°Ð½Ð¾Ñ‚Ð¾ Ð·Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ðµ Ð² ACF Ð¿Ð¾Ð»ÐµÑ‚Ð¾
    if (!empty($parameters['acf_current_diseases'])) {
        update_user_meta($user_id, 'acf_current_diseases', sanitize_text_field($parameters['acf_current_diseases']));
        update_user_meta($user_id, '_acf_current_diseases', 'field_699ddbe1a48a3');
    } elseif (!empty($parameters['disease'])) {
        update_user_meta($user_id, 'acf_current_diseases', sanitize_text_field($parameters['disease']));
        update_user_meta($user_id, '_acf_current_diseases', 'field_699ddbe1a48a3');
    }

    // Generate token
    $token = wp_generate_password(32, false);
    update_user_meta($user_id, 'auth_token', $token);
    update_user_meta($user_id, 'token_expiry', time() + (7 * DAY_IN_SECONDS));

    // Get user data
    $user = get_userdata($user_id);
    
    // Prepare user data for response
    $user_data_response = array(
        'id' => $user->ID,
        'email' => $user->user_email,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'phone' => get_user_meta($user->ID, 'acf_phone_number', true),
        'acf_phone_number' => get_user_meta($user->ID, 'acf_phone_number', true),
        'therapeutic_area' => get_user_meta($user->ID, 'acf_therapeutic_area', true),
        'acf_therapeutic_area' => get_user_meta($user->ID, 'acf_therapeutic_area', true),
        'disease' => get_user_meta($user->ID, 'disease', true),
        'profile_completed' => false
    );

    return rest_ensure_response(array(
        'success' => true,
        'token' => $token,
        'user' => $user_data_response
    ));
}
*/



function zdravei_register_user($request) {
    $parameters = $request->get_json_params();

    // Validate required fields
    if (empty($parameters['email']) || empty($parameters['password'])) {
        return new WP_Error(
            'missing_fields',
            'Email Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð° ÑÐ° Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¸',
            array('status' => 400)
        );
    }

    // Check if email already exists
    if (email_exists($parameters['email'])) {
        $existing_user = get_user_by('email', $parameters['email']);
        if ($existing_user) {
            $account_status = get_user_meta($existing_user->ID, 'account_status', true);
            if ($account_status === 'pending') {
                // ÐÐºÐ°ÑƒÐ½Ñ‚ÑŠÑ‚ ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð° Ð½Ð¾ Ð½Ðµ Ðµ Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÐ½ â€” Ð¸Ð·Ð¿Ñ€Ð°Ñ‚Ð¸ Ð½Ð¾Ð² Ð»Ð¸Ð½Ðº
                $verification_token = bin2hex(random_bytes(32));
                update_user_meta($existing_user->ID, 'email_verification_token', $verification_token);

                $verify_url = 'https://zdraveibolest.bg/verify-email?token=' . $verification_token;
                $site_name  = get_bloginfo('name');
                $subject = 'ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÑ‚Ðµ Ð¸Ð¼ÐµÐ¹Ð» Ð°Ð´Ñ€ÐµÑÐ° ÑÐ¸ â€” ' . $site_name;
                $message = '
<html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#f9fafb;">
  <div style="background:#fff;border-radius:12px;padding:40px;border:1px solid #e5e7eb;">
    <h2 style="color:#04737d;margin-top:0;">ÐÐ¾Ð² Ð»Ð¸Ð½Ðº Ð·Ð° Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ</h2>
    <p style="color:#374151;">Ð˜Ð·Ð¿Ñ€Ð°Ñ‰Ð°Ð¼Ðµ Ð’Ð¸ Ð½Ð¾Ð² Ð»Ð¸Ð½Ðº Ð·Ð° Ð°ÐºÑ‚Ð¸Ð²Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð°ÐºÐ°ÑƒÐ½Ñ‚Ð°:</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="' . esc_url($verify_url) . '"
         style="background:#04737d;color:#ffffff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;display:inline-block;">
        ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð´Ð¸ Ð¸Ð¼ÐµÐ¹Ð»
      </a>
    </div>
    <p style="color:#9ca3af;font-size:12px;margin:0;">Ð›Ð¸Ð½ÐºÑŠÑ‚ Ðµ Ð²Ð°Ð»Ð¸Ð´ÐµÐ½ 48 Ñ‡Ð°ÑÐ°.</p>
  </div>
</body></html>
';
                $headers = array('Content-Type: text/html; charset=UTF-8');
                wp_mail($parameters['email'], $subject, $message, $headers);

                return rest_ensure_response(array(
                    'success'               => true,
                    'requires_verification' => true,
                    'message'               => 'Ð˜Ð·Ð¿Ñ€Ð°Ñ‚Ð¸Ñ…Ð¼Ðµ Ð½Ð¾Ð² Ð¸Ð¼ÐµÐ¹Ð» Ð·Ð° Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ. ÐœÐ¾Ð»Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐµÑ‚Ðµ Ð¿Ð¾Ñ‰Ð°Ñ‚Ð° ÑÐ¸.',
                ));
            }
        }

        return new WP_Error(
            'email_exists',
            'Ð¢Ð¾Ð·Ð¸ email Ð²ÐµÑ‡Ðµ Ðµ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½',
            array('status' => 400)
        );
    }

    // Create user with email as username
    $user_data = array(
        'user_login' => $parameters['email'],
        'user_email' => $parameters['email'],
        'user_pass'  => $parameters['password'],
        'role'       => !empty($parameters['role']) ? $parameters['role'] : 'site_member'
    );

    if (!empty($parameters['first_name'])) {
        $user_data['first_name'] = sanitize_text_field($parameters['first_name']);
    }
    if (!empty($parameters['last_name'])) {
        $user_data['last_name'] = sanitize_text_field($parameters['last_name']);
    }

    $user_id = wp_insert_user($user_data);

    if (is_wp_error($user_id)) {
        return new WP_Error(
            'registration_failed',
            'Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ð½Ðµ Ð±ÐµÑˆÐµ ÑƒÑÐ¿ÐµÑˆÐ½Ð°',
            array('status' => 500)
        );
    }

    // Save ACF fields
    if (!empty($parameters['acf_phone_number'])) {
        update_user_meta($user_id, 'acf_phone_number', sanitize_text_field($parameters['acf_phone_number']));
    }

    if (!empty($parameters['acf_therapeutic_area'])) {
        update_user_meta($user_id, 'acf_therapeutic_area', sanitize_text_field($parameters['acf_therapeutic_area']));
    } elseif (!empty($parameters['therapeutic_area'])) {
        update_user_meta($user_id, 'acf_therapeutic_area', sanitize_text_field($parameters['therapeutic_area']));
    }

    if (!empty($parameters['acf_current_diseases'])) {
        update_user_meta($user_id, 'acf_current_diseases', sanitize_text_field($parameters['acf_current_diseases']));
        update_user_meta($user_id, '_acf_current_diseases', 'field_699ddbe1a48a3');
    } elseif (!empty($parameters['disease'])) {
        update_user_meta($user_id, 'acf_current_diseases', sanitize_text_field($parameters['disease']));
        update_user_meta($user_id, '_acf_current_diseases', 'field_699ddbe1a48a3');
    }

    // Auth token (Ð·Ð° Ð±ÑŠÐ´ÐµÑ‰Ð¾ Ð¿Ð¾Ð»Ð·Ð²Ð°Ð½Ðµ ÑÐ»ÐµÐ´ Ð²ÐµÑ€Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ)
    $token = wp_generate_password(32, false);
    update_user_meta($user_id, 'auth_token', $token);
    update_user_meta($user_id, 'token_expiry', time() + (7 * DAY_IN_SECONDS));

    // â”€â”€ Email Ð²ÐµÑ€Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    $verification_token = bin2hex(random_bytes(32));
    update_user_meta($user_id, 'email_verification_token', $verification_token);
    update_user_meta($user_id, 'account_status', 'pending');

    $verify_url = 'https://zdraveibolest.bg/verify-email?token=' . $verification_token;
    $site_name  = get_bloginfo('name');

    $subject = 'ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÑ‚Ðµ Ð¸Ð¼ÐµÐ¹Ð» Ð°Ð´Ñ€ÐµÑÐ° ÑÐ¸ â€” ' . $site_name;
    $message = '
<html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#f9fafb;">
  <div style="background:#fff;border-radius:12px;padding:40px;border:1px solid #e5e7eb;">
    <h2 style="color:#04737d;margin-top:0;">Ð”Ð¾Ð±Ñ€Ðµ Ð´Ð¾ÑˆÐ»Ð¸ Ð² ' . esc_html($site_name) . '!</h2>
    <p style="color:#374151;">Ð‘Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ð¸Ð¼ Ð’Ð¸ Ð·Ð° Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð°. Ð—Ð° Ð´Ð° Ð°ÐºÑ‚Ð¸Ð²Ð¸Ñ€Ð°Ñ‚Ðµ Ð°ÐºÐ°ÑƒÐ½Ñ‚Ð° ÑÐ¸, Ð¼Ð¾Ð»Ñ Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÑ‚Ðµ Ð¸Ð¼ÐµÐ¹Ð» Ð°Ð´Ñ€ÐµÑÐ° ÑÐ¸ Ñ Ð½Ð°Ñ‚Ð¸ÑÐºÐ°Ð½Ðµ Ð½Ð° Ð±ÑƒÑ‚Ð¾Ð½Ð° Ð¿Ð¾-Ð´Ð¾Ð»Ñƒ:</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="' . esc_url($verify_url) . '"
         style="background:#04737d;color:#ffffff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;display:inline-block;">
        ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð´Ð¸ Ð¸Ð¼ÐµÐ¹Ð»
      </a>
    </div>
    <p style="color:#6b7280;font-size:14px;">ÐÐºÐ¾ Ð½Ðµ ÑÑ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð¸ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ñ Ð² Ð½Ð°ÑˆÐ¸Ñ ÑÐ°Ð¹Ñ‚, Ð¿Ñ€Ð¾ÑÑ‚Ð¾ Ð¸Ð³Ð½Ð¾Ñ€Ð¸Ñ€Ð°Ð¹Ñ‚Ðµ Ñ‚Ð¾Ð·Ð¸ Ð¸Ð¼ÐµÐ¹Ð».</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
    <p style="color:#9ca3af;font-size:12px;margin:0;">Ð›Ð¸Ð½ÐºÑŠÑ‚ Ðµ Ð²Ð°Ð»Ð¸Ð´ÐµÐ½ 48 Ñ‡Ð°ÑÐ°.</p>
  </div>
</body></html>
';
    $headers = array('Content-Type: text/html; charset=UTF-8');
    wp_mail($parameters['email'], $subject, $message, $headers);
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    // Ð’ÑŠÑ€Ð½Ð¸ SUCCESS Ð±ÐµÐ· Ñ‚Ð¾ÐºÐµÐ½ â€” Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÑ‚ Ñ‚Ñ€ÑÐ±Ð²Ð° Ð¿ÑŠÑ€Ð²Ð¾ Ð´Ð° Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´Ð¸ Ð¸Ð¼ÐµÐ¹Ð»Ð°
    return rest_ensure_response(array(
        'success'               => true,
        'requires_verification' => true,
        'message'               => 'Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ðµ ÑƒÑÐ¿ÐµÑˆÐ½Ð°. ÐœÐ¾Ð»Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐµÑ‚Ðµ Ð¸Ð¼ÐµÐ¹Ð»Ð° ÑÐ¸ Ð¸ Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÑ‚Ðµ Ð°ÐºÐ°ÑƒÐ½Ñ‚Ð°.',
    ));
}






/**
 * Login User - Custom endpoint
 */
/*
function zdravei_login_user($request) {
    $parameters = $request->get_json_params();
    
    if (empty($parameters['username']) || empty($parameters['password'])) {
        return new WP_Error('missing_credentials', 'ÐœÐ¾Ð»Ñ, Ð²ÑŠÐ²ÐµÐ´ÐµÑ‚Ðµ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 400));
    }
    
    // Authenticate
    $user = wp_authenticate($parameters['username'], $parameters['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'Ð“Ñ€ÐµÑˆÐ½Ð¾ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸Ð»Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 401));
    }
    
    // Generate JWT token
    $token = zdravei_generate_jwt_token($user);
    
    return array(
        'success' => true,
        'message' => 'Ð£ÑÐ¿ÐµÑˆÐµÐ½ Ð²Ñ…Ð¾Ð´',
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user->ID, 'first_name', true),
            'last_name' => get_user_meta($user->ID, 'last_name', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
        )
    );
}
*/
function zdravei_login_user($request) {
    $parameters = $request->get_json_params();
    
    if (empty($parameters['username']) || empty($parameters['password'])) {
        return new WP_Error('missing_credentials', 'ÐœÐ¾Ð»Ñ, Ð²ÑŠÐ²ÐµÐ´ÐµÑ‚Ðµ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 400));
    }
    
    // Authenticate
    $user = wp_authenticate($parameters['username'], $parameters['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'Ð“Ñ€ÐµÑˆÐ½Ð¾ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸Ð»Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 401));
    }
    // â”€â”€ ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð·Ð° Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÐ½ Ð¸Ð¼ÐµÐ¹Ð» â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    $account_status = get_user_meta($user->ID, 'account_status', true);
    if ($account_status === 'pending') {
        return new WP_REST_Response(array(
            'success'               => false,
            'requires_verification' => true,
            'message'               => 'ÐœÐ¾Ð»Ñ Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÑ‚Ðµ Ð¸Ð¼ÐµÐ¹Ð» Ð°Ð´Ñ€ÐµÑÐ° ÑÐ¸ Ð¿Ñ€ÐµÐ´Ð¸ Ð´Ð° Ð²Ð»ÐµÐ·ÐµÑ‚Ðµ. ÐŸÑ€Ð¾Ð²ÐµÑ€ÐµÑ‚Ðµ Ð¿Ð¾Ñ‰Ð°Ñ‚Ð° ÑÐ¸ Ð·Ð° Ð¿Ð¸ÑÐ¼Ð¾Ñ‚Ð¾ Ñ Ð»Ð¸Ð½Ðº Ð·Ð° Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ñ.',
        ), 403);
    }
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    
    // Generate JWT token
    $token = zdravei_generate_jwt_token($user);
    
    return array(
        'success' => true,
        'message' => 'Ð£ÑÐ¿ÐµÑˆÐµÐ½ Ð²Ñ…Ð¾Ð´',
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user->ID, 'first_name', true),
            'last_name' => get_user_meta($user->ID, 'last_name', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
        )
    );
}



/**
 * Validate Token - Helper function
 */
function zdravei_validate_token($request) {
    // Ð’Ð·Ð¸Ð¼Ð°Ð¼Ðµ Ñ‚Ð¾ÐºÐµÐ½Ð° Ð¾Ñ‚ custom header X-Auth-Token
    $token = $request->get_header('X-Auth-Token');
    
    if (empty($token)) {
        // ÐžÐ¿Ð¸Ñ‚Ð°Ð¹ lowercase Ð²Ð°Ñ€Ð¸Ð°Ð½Ñ‚
        $token = $request->get_header('x-auth-token');
    }
    
    if (empty($token) && isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
        $token = $_SERVER['HTTP_X_AUTH_TOKEN'];
    }
    
    if (empty($token)) {
        return new WP_Error('no_token', 'Ð›Ð¸Ð¿ÑÐ²Ð° Ñ‚Ð¾ÐºÐµÐ½ Ð·Ð° Ð°Ð²Ñ‚ÐµÐ½Ñ‚Ð¸ÐºÐ°Ñ†Ð¸Ñ', array('status' => 401));
    }
    
    // Decode JWT token
    $decoded = zdravei_decode_jwt_token($token);
    
    if (is_wp_error($decoded)) {
        return $decoded;
    }
    
    $user_id = zdravei_get_user_id_from_token($decoded);
    
    if (!$user_id) {
        return new WP_Error('no_user_id', 'ÐÐµ Ðµ Ð½Ð°Ð¼ÐµÑ€ÐµÐ½ user_id Ð² Ñ‚Ð¾ÐºÐµÐ½Ð°', array('status' => 401));
    }
    
    $user = get_user_by('id', $user_id);
    
    if (!$user) {
        return new WP_Error('invalid_user', 'ÐŸÐ¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÑ‚ Ð½Ðµ ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð°', array('status' => 404));
    }
    
    // Ð’Ñ€ÑŠÑ‰Ð°Ð¼Ðµ USER OBJECT, Ð½Ðµ Ð¼Ð°ÑÐ¸Ð²!
    return $user;
}

// ============================================
// 3. JWT TOKEN HELPERS
// ============================================

/**
 * Generate JWT Token
 */
function zdravei_generate_jwt_token($user) {
    $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : 'your-secret-key-here';
    $issued_at = time();
    $expiration_time = $issued_at + (60 * 60 * 24 * 7); // 7 days
    
    $payload = array(
        'iss' => get_bloginfo('url'),
        'iat' => $issued_at,
        'exp' => $expiration_time,
        'data' => array(
            'user' => array(
                'id' => $user->ID,
            )
        )
    );
    
    // If JWT plugin is installed, use it
    if (function_exists('JWT::encode')) {
        return \Firebase\JWT\JWT::encode($payload, $secret_key, 'HS256');
    }
    
    // Simple fallback token
    return base64_encode(json_encode($payload));
}

/**
 * Decode JWT Token - Ð¿Ð¾Ð´Ð´ÑŠÑ€Ð¶Ð° Ð¸ JWT Ð¸ base64 Ñ‚Ð¾ÐºÐµÐ½Ð¸
 */
/**
 * Decode JWT Token - Ð¿Ð¾Ð´Ð´ÑŠÑ€Ð¶Ð° Ð¸ JWT Ð¸ base64 Ñ‚Ð¾ÐºÐµÐ½Ð¸
 */
/*
function zdravei_decode_jwt_token($token) {
    try {
        // ÐŸÑ€Ð¾Ð²ÐµÑ€ÑÐ²Ð°Ð¼Ðµ Ð´Ð°Ð»Ð¸ Ðµ JWT (Ð¸Ð¼Ð° 3 Ñ‡Ð°ÑÑ‚Ð¸)
        $parts = explode('.', $token);
        
        if (count($parts) === 3) {
            // JWT Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ - Ð´ÐµÐºÐ¾Ð´Ð¸Ñ€Ð°Ð¼Ðµ payload (ÑÑ€ÐµÐ´Ð½Ð°Ñ‚Ð° Ñ‡Ð°ÑÑ‚)
            $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])));
            
            if (!$payload || !isset($payload->data->user->id)) {
                return new WP_Error('invalid_token', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ñ‚Ð¾ÐºÐµÐ½', array('status' => 401));
            }
            
            if (isset($payload->exp) && $payload->exp < time()) {
                return new WP_Error('expired_token', 'Ð˜Ð·Ñ‚ÐµÐºÑŠÐ» Ñ‚Ð¾ÐºÐµÐ½', array('status' => 401));
            }
            
            return $payload;
        }
        
        // Base64 Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ (1 Ñ‡Ð°ÑÑ‚ - fallback)
        $decoded = json_decode(base64_decode($token));
        
        if (!$decoded) {
            return new WP_Error('invalid_token', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ñ‚Ð¾ÐºÐµÐ½', array('status' => 401));
        }
        
        if (!isset($decoded->data->user->id)) {
            return new WP_Error('invalid_token', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´Ð½Ð° ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð° Ð½Ð° Ñ‚Ð¾ÐºÐµÐ½Ð°', array('status' => 401));
        }
        
        if (isset($decoded->exp) && $decoded->exp < time()) {
            return new WP_Error('expired_token', 'Ð˜Ð·Ñ‚ÐµÐºÑŠÐ» Ñ‚Ð¾ÐºÐµÐ½', array('status' => 401));
        }
        
        return $decoded;
        
    } catch (Exception $e) {
        return new WP_Error('token_error', $e->getMessage(), array('status' => 401));
    }
}
*/

// ============================================
// 4. CORS SUPPORT
// ============================================

/**
 * Enable CORS for REST API
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
        
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
        
        return $value;
    });
}, 15);

/* END Protected content */






// ============================================
// ZDRAVEIBOLEST CUSTOM FUNCTIONS
// ============================================

// ============================================
// 0. BYPASS JWT AUTHENTICATION PLUGIN
// ============================================
add_filter('jwt_auth_whitelist', function($endpoints) {
    $endpoints[] = '/wp-json/zdravei/v1/update-profile';
    $endpoints[] = '/wp-json/zdravei/v1/clinical-trial-inquiry';
    $endpoints[] = '/wp-json/zdravei/v1/validate';
    $endpoints[] = '/wp-json/zdravei/v1/register';
    $endpoints[] = '/wp-json/zdravei/v1/login';
    return $endpoints;
});

// ============================================
// 1. JWT DECODE Ð¤Ð£ÐÐšÐ¦Ð˜Ð¯ (Ð¿Ð¾Ð´Ð´ÑŠÑ€Ð¶Ð° 1 Ð¸ 3 ÑÐµÐ³Ð¼ÐµÐ½Ñ‚Ð°)
// ============================================
function zdravei_decode_jwt_token($token) {
    if (empty($token)) {
        return new WP_Error('empty_token', 'Ð¢Ð¾ÐºÐµÐ½ÑŠÑ‚ Ðµ Ð¿Ñ€Ð°Ð·ÐµÐ½', array('status' => 401));
    }
    
    $parts = explode('.', $token);
    
    // Ð¤Ð¾Ñ€Ð¼Ð°Ñ‚ 1: Ð¡Ñ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚ÐµÐ½ JWT Ñ 3 ÑÐµÐ³Ð¼ÐµÐ½Ñ‚Ð°
    if (count($parts) === 3) {
        $payload_base64 = $parts[1];
        $payload_json = base64_decode(str_replace(['-', '_'], ['+', '/'], $payload_base64));
        $payload = json_decode($payload_json);
        
        if (!$payload) {
            return new WP_Error('invalid_token', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ñ‚Ð¾ÐºÐµÐ½', array('status' => 401));
        }
        
        if (isset($payload->exp) && $payload->exp < time()) {
            return new WP_Error('expired_token', 'Ð¢Ð¾ÐºÐµÐ½ÑŠÑ‚ Ðµ Ð¸Ð·Ñ‚ÐµÐºÑŠÐ»', array('status' => 401));
        }
        
        return $payload;
    }
    
    // Ð¤Ð¾Ñ€Ð¼Ð°Ñ‚ 2: 1-ÑÐµÐ³Ð¼ÐµÐ½Ñ‚ÐµÐ½ base64 payload
    if (count($parts) === 1) {
        $payload_json = base64_decode(str_replace(['-', '_'], ['+', '/'], $token));
        $payload = json_decode($payload_json);
        
        if (!$payload) {
            return new WP_Error('invalid_token', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ñ‚Ð¾ÐºÐµÐ½', array('status' => 401));
        }
        
        if (isset($payload->exp) && $payload->exp < time()) {
            return new WP_Error('expired_token', 'Ð¢Ð¾ÐºÐµÐ½ÑŠÑ‚ Ðµ Ð¸Ð·Ñ‚ÐµÐºÑŠÐ»', array('status' => 401));
        }
        
        return $payload;
    }
    
    return new WP_Error('invalid_token_format', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ Ð½Ð° Ñ‚Ð¾ÐºÐµÐ½Ð°', array('status' => 401));
}

// Helper Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ Ð·Ð° Ð¸Ð·Ð²Ð»Ð¸Ñ‡Ð°Ð½Ðµ Ð½Ð° user_id Ð¾Ñ‚ decoded token
function zdravei_get_user_id_from_token($decoded) {
    if (isset($decoded->data->user->id)) {
        return $decoded->data->user->id;
    }
    if (isset($decoded->user_id)) {
        return $decoded->user_id;
    }
    return null;
}




// ============================================
// 2. Ð Ð•Ð“Ð˜Ð¡Ð¢Ð ÐÐ¦Ð˜Ð¯ ÐÐ SITE_MEMBER Ð ÐžÐ›Ð¯
// ============================================
function zdravei_register_site_member_role() {
    if (!get_role('site_member')) {
        add_role('site_member', 'Member', array('read' => true, 'level_0' => true));
    }
}
add_action('init', 'zdravei_register_site_member_role');

// ============================================
// 3. REST API ENDPOINT Ð—Ð VALIDATE
// ============================================
function zdravei_validate_callback($request) {
    $token = $request->get_header('X-Auth-Token');
    
    if (empty($token)) {
        $token = $request->get_header('x-auth-token');
    }
    
    if (empty($token) && isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
        $token = $_SERVER['HTTP_X_AUTH_TOKEN'];
    }
    
    if (empty($token)) {
        return array('valid' => false, 'message' => 'No token provided');
    }
    
    $decoded = zdravei_decode_jwt_token($token);
    
    if (is_wp_error($decoded)) {
        return $decoded;
    }
    
    $user_id = zdravei_get_user_id_from_token($decoded);
    
    if (!$user_id) {
        return new WP_Error('no_user_id', 'ÐÐµ Ðµ Ð½Ð°Ð¼ÐµÑ€ÐµÐ½ user_id Ð² Ñ‚Ð¾ÐºÐµÐ½Ð°', array('status' => 401));
    }
    
    $user = get_userdata($user_id);
    if (!$user) {
        return new WP_Error('user_not_found', 'ÐŸÐ¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÑ‚ Ð½Ðµ Ðµ Ð½Ð°Ð¼ÐµÑ€ÐµÐ½', array('status' => 404));
    }
    
    return array(
        'id' => $user->ID,
        'user_id' => $user->ID,
        'username' => $user->user_login,
        'email' => $user->user_email,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'display_name' => $user->display_name,
        'role' => implode(', ', $user->roles),
        'phone' => get_user_meta($user->ID, 'acf_phone_number', true),
        'acf_phone_number' => get_user_meta($user->ID, 'acf_phone_number', true),
        'therapeutic_area' => get_user_meta($user->ID, 'acf_therapeutic_area', true),
        'acf_therapeutic_area' => get_user_meta($user->ID, 'acf_therapeutic_area', true),
        'birth_year' => get_user_meta($user->ID, 'acf_birth_year', true),
        'acf_birth_year' => get_user_meta($user->ID, 'acf_birth_year', true),
        'gender' => get_user_meta($user->ID, 'acf_gender', true),
        'acf_gender' => get_user_meta($user->ID, 'acf_gender', true),
        'city' => get_user_meta($user->ID, 'acf_city', true),
        'acf_city' => get_user_meta($user->ID, 'acf_city', true),
        'current_conditions' => get_user_meta($user->ID, 'acf_current_diseases', true),
        'acf_current_diseases' => get_user_meta($user->ID, 'acf_current_diseases', true),
        'current_medications' => get_user_meta($user->ID, 'acf_current_medications', true),
        'acf_current_medications' => get_user_meta($user->ID, 'acf_current_medications', true),
        'smoking_status' => get_user_meta($user->ID, 'acf_smoking_status', true),
        'acf_smoking_status' => get_user_meta($user->ID, 'acf_smoking_status', true),
        'additional_info' => get_user_meta($user->ID, 'acf_additional_health_info', true),
        'acf_additional_health_info' => get_user_meta($user->ID, 'acf_additional_health_info', true),
        'disease' => get_user_meta($user->ID, 'disease', true),
        'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
    );
}

// ============================================
// 4. REST API ENDPOINT Ð—Ð UPDATE PROFILE
// ============================================
function zdravei_register_update_profile_endpoint() {
    register_rest_route('zdravei/v1', '/update-profile', array(
        'methods' => 'POST',
        'callback' => 'zdravei_update_profile_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_update_profile_endpoint');

// ============================================================
// Ð¤Ð£ÐÐšÐ¦Ð˜Ð¯ 2: UPDATE PROFILE
// ============================================================

function zdravei_update_profile_callback($request) {
    $params = $request->get_json_params();
    
    $user = zdravei_validate_token($request);
    
    if (is_wp_error($user)) {
        return $user;
    }
    
    $user_id = $user->ID;
    
    $user_update_data = array('ID' => $user_id);
    
    if (isset($params['first_name'])) {
        $user_update_data['first_name'] = sanitize_text_field($params['first_name']);
    }
    
    if (isset($params['last_name'])) {
        $user_update_data['last_name'] = sanitize_text_field($params['last_name']);
    }
    
    if (count($user_update_data) > 1) {
        wp_update_user($user_update_data);
    }
    
    if (isset($params['acf_phone_number']) && $params['acf_phone_number'] !== '') {
        delete_user_meta($user_id, 'acf_phone_number');
        delete_user_meta($user_id, '_acf_phone_number');
        update_user_meta($user_id, 'acf_phone_number', $params['acf_phone_number']);
        update_user_meta($user_id, '_acf_phone_number', 'field_699dd9b1a489f');
    }
    
    if (isset($params['acf_therapeutic_area']) && $params['acf_therapeutic_area'] !== '') {
        delete_user_meta($user_id, 'acf_therapeutic_area');
        delete_user_meta($user_id, '_acf_therapeutic_area');
        update_user_meta($user_id, 'acf_therapeutic_area', $params['acf_therapeutic_area']);
        update_user_meta($user_id, '_acf_therapeutic_area', 'field_699e96f9f49dc');
    }
    
    if (isset($params['acf_birth_year']) && $params['acf_birth_year'] !== '') {
        delete_user_meta($user_id, 'acf_birth_year');
        delete_user_meta($user_id, '_acf_birth_year');
        update_user_meta($user_id, 'acf_birth_year', $params['acf_birth_year']);
        update_user_meta($user_id, '_acf_birth_year', 'field_699ddb4fa48a0');
    }
    
    if (isset($params['acf_gender']) && $params['acf_gender'] !== '') {
        delete_user_meta($user_id, 'acf_gender');
        delete_user_meta($user_id, '_acf_gender');
        update_user_meta($user_id, 'acf_gender', $params['acf_gender']);
        update_user_meta($user_id, '_acf_gender', 'field_699ddb68a48a1');
    }
    
    if (isset($params['acf_city']) && $params['acf_city'] !== '') {
        delete_user_meta($user_id, 'acf_city');
        delete_user_meta($user_id, '_acf_city');
        update_user_meta($user_id, 'acf_city', $params['acf_city']);
        update_user_meta($user_id, '_acf_city', 'field_699ddbcfa48a2');
    }
    
    if (isset($params['acf_current_diseases']) && $params['acf_current_diseases'] !== '') {
        delete_user_meta($user_id, 'acf_current_diseases');
        delete_user_meta($user_id, '_acf_current_diseases');
        update_user_meta($user_id, 'acf_current_diseases', $params['acf_current_diseases']);
        update_user_meta($user_id, '_acf_current_diseases', 'field_699ddbe1a48a3');
    }
    
    if (isset($params['acf_current_medications']) && $params['acf_current_medications'] !== '') {
        delete_user_meta($user_id, 'acf_current_medications');
        delete_user_meta($user_id, '_acf_current_medications');
        update_user_meta($user_id, 'acf_current_medications', $params['acf_current_medications']);
        update_user_meta($user_id, '_acf_current_medications', 'field_699ddc1ca48a4');
    }
    
    if (isset($params['acf_smoking_status']) && $params['acf_smoking_status'] !== '') {
        delete_user_meta($user_id, 'acf_smoking_status');
        delete_user_meta($user_id, '_acf_smoking_status');
        update_user_meta($user_id, 'acf_smoking_status', $params['acf_smoking_status']);
        update_user_meta($user_id, '_acf_smoking_status', 'field_699ddc3ea48a5');
    }
    
    if (isset($params['acf_additional_health_info']) && $params['acf_additional_health_info'] !== '') {
        delete_user_meta($user_id, 'acf_additional_health_info');
        delete_user_meta($user_id, '_acf_additional_health_info');
        update_user_meta($user_id, 'acf_additional_health_info', $params['acf_additional_health_info']);
        update_user_meta($user_id, '_acf_additional_health_info', 'field_699ddcb4a48a6');
    }
    
    if (isset($params['disease'])) {
        update_user_meta($user_id, 'disease', sanitize_text_field($params['disease']));
    }
    
    update_user_meta($user_id, 'profile_completed', true);
    
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'ÐŸÑ€Ð¾Ñ„Ð¸Ð»ÑŠÑ‚ Ðµ Ð¾Ð±Ð½Ð¾Ð²ÐµÐ½ ÑƒÑÐ¿ÐµÑˆÐ½Ð¾'
    ));
}

// ============================================
// 5. REST API ENDPOINT Ð—Ð CLINICAL TRIAL INQUIRY
// ============================================
function zdravei_register_clinical_inquiry_endpoint() {
    register_rest_route('zdravei/v1', '/clinical-trial-inquiry', array(
        'methods' => 'POST',
        'callback' => 'zdravei_clinical_inquiry_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_clinical_inquiry_endpoint');

function zdravei_clinical_inquiry_callback($request) {
    $params = $request->get_json_params();
    
    // Ð’Ð·Ð¸Ð¼Ð°Ð¼Ðµ Ñ‚Ð¾ÐºÐµÐ½Ð° Ð¾Ñ‚ custom header X-Auth-Token
    $token = $request->get_header('X-Auth-Token');
    
    if (empty($token)) {
        return new WP_Error('no_token', 'Ð›Ð¸Ð¿ÑÐ²Ð° Ñ‚Ð¾ÐºÐµÐ½ Ð·Ð° Ð°Ð²Ñ‚ÐµÐ½Ñ‚Ð¸ÐºÐ°Ñ†Ð¸Ñ', array('status' => 401));
    }
    
    $decoded = zdravei_decode_jwt_token($token);
    if (is_wp_error($decoded)) {
        return $decoded;
    }
    
    $user_id = zdravei_get_user_id_from_token($decoded);
    if (!$user_id) {
        return new WP_Error('no_user_id', 'ÐÐµ Ðµ Ð½Ð°Ð¼ÐµÑ€ÐµÐ½ user_id Ð² Ñ‚Ð¾ÐºÐµÐ½Ð°', array('status' => 401));
    }
    
    $current_user = get_userdata($user_id);
    if (!$current_user) {
        return new WP_Error('invalid_user', 'ÐŸÐ¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÑ‚ Ð½Ðµ Ðµ Ð½Ð°Ð¼ÐµÑ€ÐµÐ½', array('status' => 404));
    }
    
    $admin_email = get_option('admin_email');
    $subject = 'ÐÐ¾Ð²Ð° Ð·Ð°ÑÐ²ÐºÐ° Ð·Ð° ÐºÐ»Ð¸Ð½Ð¸Ñ‡Ð½Ð¾ Ð¸Ð·Ð¿Ð¸Ñ‚Ð²Ð°Ð½Ðµ Ð¾Ñ‚ ' . sanitize_text_field($params['first_name']) . ' ' . sanitize_text_field($params['last_name']);
    
    $gender_labels = array('male' => 'ÐœÑŠÐ¶', 'female' => 'Ð–ÐµÐ½Ð°', 'other' => 'Ð”Ñ€ÑƒÐ³Ð¾', 'prefer_not_to_say' => 'ÐŸÑ€ÐµÐ´Ð¿Ð¾Ñ‡Ð¸Ñ‚Ð° Ð´Ð° Ð½Ðµ Ð¾Ñ‚Ð³Ð¾Ð²Ð¾Ñ€Ð¸');
    $smoking_labels = array('never' => 'ÐÐ¸ÐºÐ¾Ð³Ð° Ð½Ðµ Ðµ Ð¿ÑƒÑˆÐ¸Ð»/Ð°', 'former' => 'Ð‘Ð¸Ð²Ñˆ Ð¿ÑƒÑˆÐ°Ñ‡', 'current' => 'ÐŸÑƒÑˆÐ¸ Ð² Ð¼Ð¾Ð¼ÐµÐ½Ñ‚Ð°', 'occasional' => 'ÐŸÑƒÑˆÐ¸ Ñ€ÑÐ´ÐºÐ¾');
    
    $message = "ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð° Ðµ Ð½Ð¾Ð²Ð° Ð·Ð°ÑÐ²ÐºÐ° Ð·Ð° ÐºÐ»Ð¸Ð½Ð¸Ñ‡Ð½Ð¾ Ð¸Ð·Ð¿Ð¸Ñ‚Ð²Ð°Ð½Ðµ:\n\n";
    $message .= "=== Ð›Ð˜Ð§ÐÐ Ð˜ÐÐ¤ÐžÐ ÐœÐÐ¦Ð˜Ð¯ ===\n";
    $message .= "Ð˜Ð¼Ðµ: " . sanitize_text_field($params['first_name']) . "\n";
    $message .= "Ð¤Ð°Ð¼Ð¸Ð»Ð¸Ñ: " . sanitize_text_field($params['last_name']) . "\n";
    $message .= "Ð˜Ð¼ÐµÐ¹Ð»: " . sanitize_email($params['email']) . "\n";
    $message .= "Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½: " . sanitize_text_field($params['phone']) . "\n";
    $message .= "Ð“Ð¾Ð´Ð¸Ð½Ð° Ð½Ð° Ñ€Ð°Ð¶Ð´Ð°Ð½Ðµ: " . sanitize_text_field($params['birth_year']) . "\n";
    $message .= "ÐŸÐ¾Ð»: " . ($gender_labels[$params['gender']] ?? $params['gender']) . "\n";
    $message .= "Ð“Ñ€Ð°Ð´: " . sanitize_text_field($params['city']) . "\n\n";
    $message .= "=== Ð—Ð”Ð ÐÐ’ÐÐ Ð˜ÐÐ¤ÐžÐ ÐœÐÐ¦Ð˜Ð¯ ===\n";
    $message .= "ÐÐ°ÑÑ‚Ð¾ÑÑ‰Ð¸ Ð·Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ð¸Ñ: " . sanitize_text_field($params['current_conditions']) . "\n";
    $message .= "ÐŸÑ€Ð¸ÐµÐ¼ Ð½Ð° Ð¼ÐµÐ´Ð¸ÐºÐ°Ð¼ÐµÐ½Ñ‚Ð¸: " . sanitize_text_field($params['current_medications']) . "\n";
    $message .= "ÐŸÑƒÑˆÐµÐ½Ðµ: " . ($smoking_labels[$params['smoking_status']] ?? $params['smoking_status']) . "\n";
    $message .= "Ð”Ð¾Ð¿ÑŠÐ»Ð½Ð¸Ñ‚ÐµÐ»Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ: " . sanitize_textarea_field($params['additional_info']) . "\n\n";
    $message .= "User ID: " . $current_user->ID . "\n";
    $message .= "Ð›Ð¸Ð½Ðº: " . admin_url('user-edit.php?user_id=' . $current_user->ID) . "\n";
    
    $headers = array('Content-Type: text/plain; charset=UTF-8');
    $sent = wp_mail($admin_email, $subject, $message, $headers);

    // ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð´Ð¸Ñ‚ÐµÐ»ÐµÐ½ Ð¸Ð¼ÐµÐ¹Ð» ÐºÑŠÐ¼ ÐºÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚Ð°
    $user_subject = 'Ð‘Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ð¸Ð¼ Ð’Ð¸ Ð·Ð° ÐºÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð°Ñ‚Ð°!';
    $user_message  = "Ð—Ð´Ñ€Ð°Ð²ÐµÐ¹Ñ‚Ðµ,\n\n";
    $user_message .= "Ð Ð°Ð´Ð²Ð°Ð¼Ðµ ÑÐµ, Ñ‡Ðµ Ð²ÐµÑ‡Ðµ ÑÑ‚Ðµ Ñ‡Ð°ÑÑ‚ Ð¾Ñ‚ 'Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚' â€” Ð´Ð¾Ð±Ñ€Ðµ Ð´Ð¾ÑˆÐ»Ð¸! ðŸ˜Š\n\n";
    $user_message .= "Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ð’Ð¸ Ðµ ÑƒÑÐ¿ÐµÑˆÐ½Ð° Ð¸ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»ÑŠÑ‚ Ð’Ð¸ Ðµ Ð°ÐºÑ‚Ð¸Ð²ÐµÐ½. Ð©Ð¾Ð¼ ÑÐµ Ð¿Ð¾ÑÐ²Ð¸ ÐºÐ»Ð¸Ð½Ð¸Ñ‡Ð½Ð° Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð°, ÐºÐ¾ÑÑ‚Ð¾ ÑÑŠÐ²Ð¿Ð°Ð´Ð° Ñ Ñ‚Ð¾Ð²Ð°, ÐºÐ¾ÐµÑ‚Ð¾ ÑÑ‚Ðµ Ð¾Ñ‚Ð±ÐµÐ»ÑÐ·Ð°Ð»Ð¸, Ñ‰Ðµ Ð’Ð¸ Ð¿Ð¸ÑˆÐµÐ¼, Ð·Ð° Ð´Ð° Ð’Ð¸ Ñ€Ð°Ð·ÐºÐ°Ð¶ÐµÐ¼ Ð¿Ð¾Ð²ÐµÑ‡Ðµ Ð¸ Ð´Ð° Ð’Ð¸ Ð´Ð°Ð´ÐµÐ¼ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ Ð´Ð° ÑÐµ Ð²ÐºÐ»ÑŽÑ‡Ð¸Ñ‚Ðµ.\n\n";
    $user_message .= "Ð’ ÑÐ»ÑƒÑ‡Ð°Ð¹, Ñ‡Ðµ ÑÐµ ÑÐµÑ‚Ð¸Ñ‚Ðµ Ð·Ð° Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ», Ð±Ð»Ð¸Ð·ÑŠÐº Ð¸Ð»Ð¸ Ð¿Ð¾Ð·Ð½Ð°Ñ‚, Ð·Ð° ÐºÐ¾Ð³Ð¾Ñ‚Ð¾ ÑÑŠÑ‰Ð°Ñ‚Ð° Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ñ Ð±Ð¸ Ð±Ð¸Ð»Ð° Ð¿Ð¾Ð»ÐµÐ·Ð½Ð°, Ñ‰Ðµ ÑÐµ Ñ€Ð°Ð´Ð²Ð°Ð¼Ðµ Ð´Ð° Ð¼Ñƒ ÑÐ¿Ð¾Ð´ÐµÐ»Ð¸Ñ‚Ðµ Ð·Ð° Ð½Ð°Ñ.\n\n";
    $user_message .= "Ð‘Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ð¸Ð¼ Ð’Ð¸, Ñ‡Ðµ ÑÑ‚Ðµ Ñ‚ÑƒÐº!\n\n";
    $user_message .= "ÐŸÐ¾Ð·Ð´Ñ€Ð°Ð²Ð¸, Ð•ÐºÐ¸Ð¿ÑŠÑ‚ Ð½Ð° 'Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚'";
    wp_mail( $current_user->user_email, $user_subject, $user_message, array( 'Content-Type: text/plain; charset=UTF-8' ) );
    
    update_user_meta($current_user->ID, 'clinical_inquiry_submitted', true);
    update_user_meta($current_user->ID, 'clinical_inquiry_date', current_time('mysql'));
    
    return array('success' => true, 'message' => 'Ð—Ð°ÑÐ²ÐºÐ°Ñ‚Ð° Ðµ Ð¸Ð·Ð¿Ñ€Ð°Ñ‚ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾');
}

// ============================================
// 6. REST API ENDPOINT Ð—Ð REGISTER
// ============================================
/*
function zdravei_register_register_endpoint() {
    register_rest_route('zdravei/v1', '/register', array(
        'methods' => 'POST',
        'callback' => 'zdravei_register_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_register_endpoint');
*/
function zdravei_register_callback($request) {
    $params = $request->get_json_params();
    
    // Ð’Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ñ Ð½Ð° Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¸ Ð¿Ð¾Ð»ÐµÑ‚Ð°
    if (empty($params['username']) || empty($params['email']) || empty($params['password'])) {
        return new WP_Error('missing_fields', 'ÐœÐ¾Ð»Ñ, Ð¿Ð¾Ð¿ÑŠÐ»Ð½ÐµÑ‚Ðµ Ð²ÑÐ¸Ñ‡ÐºÐ¸ Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¸ Ð¿Ð¾Ð»ÐµÑ‚Ð°', array('status' => 400));
    }
    
    // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð´Ð°Ð»Ð¸ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾Ñ‚Ð¾ Ð¸Ð¼Ðµ Ð²ÐµÑ‡Ðµ ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð°
    if (username_exists($params['username'])) {
        return new WP_Error('username_exists', 'ÐŸÐ¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾Ñ‚Ð¾ Ð¸Ð¼Ðµ Ð²ÐµÑ‡Ðµ ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð°', array('status' => 400));
    }
    
    // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð´Ð°Ð»Ð¸ Ð¸Ð¼ÐµÐ¹Ð»ÑŠÑ‚ Ð²ÐµÑ‡Ðµ ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð°
    if (email_exists($params['email'])) {
        return new WP_Error('email_exists', 'Ð˜Ð¼ÐµÐ¹Ð»ÑŠÑ‚ Ð²ÐµÑ‡Ðµ Ðµ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½', array('status' => 400));
    }
    
    // Ð¡ÑŠÐ·Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ð½Ð¾Ð² Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»
    $user_id = wp_create_user(
        sanitize_text_field($params['username']),
        $params['password'],
        sanitize_email($params['email'])
    );
    
    if (is_wp_error($user_id)) {
        return $user_id;
    }
    
    // Ð—Ð°Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ñ€Ð¾Ð»Ñ site_member
    $user = new WP_User($user_id);
    $user->set_role('site_member');
    
    // ÐžÐ±Ð½Ð¾Ð²ÑÐ²Ð°Ð½Ðµ Ð½Ð° Ð¾ÑÐ½Ð¾Ð²Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ
    if (!empty($params['first_name'])) {
        wp_update_user(array(
            'ID' => $user_id,
            'first_name' => sanitize_text_field($params['first_name'])
        ));
    }
    
    if (!empty($params['last_name'])) {
        wp_update_user(array(
            'ID' => $user_id,
            'last_name' => sanitize_text_field($params['last_name'])
        ));
    }
    
    // Ð—Ð°Ð¿Ð°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° custom meta Ð¿Ð¾Ð»ÐµÑ‚Ð°
    if (!empty($params['phone'])) {
        update_user_meta($user_id, 'phone', sanitize_text_field($params['phone']));
    }
    
    if (!empty($params['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($params['therapeutic_area']));
    }
    
    // Ð’ÐÐ–ÐÐž: Ð—Ð°Ð¿Ð°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¸Ð·Ð±Ñ€Ð°Ð½Ð¾Ñ‚Ð¾ Ð·Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ðµ
    /*
    if (!empty($params['disease'])) {
        update_user_meta($user_id, 'disease', sanitize_text_field($params['disease']));
    }
    */
    // Ð—Ð°Ð¿Ð¸ÑÐ²Ð°Ð½Ðµ Ð½Ð° Ð¸Ð·Ð±Ñ€Ð°Ð½Ð¾Ñ‚Ð¾ Ð·Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ðµ Ð² ACF Ð¿Ð¾Ð»ÐµÑ‚Ð¾
    if (!empty($params['acf_current_diseases'])) {
        update_user_meta($user_id, 'acf_current_diseases', sanitize_text_field($params['acf_current_diseases']));
        update_user_meta($user_id, '_acf_current_diseases', 'field_699ddbe1a48a3');
    } elseif (!empty($params['disease'])) {
        // backward compat
        update_user_meta($user_id, 'acf_current_diseases', sanitize_text_field($params['disease']));
        update_user_meta($user_id, '_acf_current_diseases', 'field_699ddbe1a48a3');
    }
    
    // Ð”Ð¾Ð¿ÑŠÐ»Ð½Ð¸Ñ‚ÐµÐ»Ð½Ð¸ meta Ð¿Ð¾Ð»ÐµÑ‚Ð°
    update_user_meta($user_id, 'registration_date', current_time('mysql'));
    update_user_meta($user_id, 'registration_source', 'website');
    update_user_meta($user_id, 'profile_completed', false);
    
    // Ð’ÐÐ–ÐÐž: Ð¢Ñ€Ð¸Ð³ÑŠÑ€Ð²Ð°Ð½Ðµ Ð½Ð° 'user_register' hook Ð·Ð° Ð¿Ð»ÑŠÐ³Ð¸Ð½Ð¸ ÐºÐ°Ñ‚Ð¾ "Better Notification WP"
    // wp_create_user() ÐÐ• Ñ‚Ñ€Ð¸Ð³ÑŠÑ€Ð²Ð° Ñ‚Ð¾Ð·Ð¸ hook Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾, Ð·Ð°Ñ‚Ð¾Ð²Ð° Ð³Ð¾ Ð¿Ñ€Ð°Ð²Ð¸Ð¼ Ñ€ÑŠÑ‡Ð½Ð¾
    do_action('user_register', $user_id, array(
        'user_login' => $params['username'],
        'user_email' => $params['email'],
        'first_name' => $params['first_name'] ?? '',
        'last_name' => $params['last_name'] ?? '',
        'role' => 'site_member',
    ));
    
    // Ð“ÐµÐ½ÐµÑ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° JWT Ñ‚Ð¾ÐºÐµÐ½
    $token_data = array(
        'iss' => get_bloginfo('url'),
        'iat' => time(),
        'exp' => time() + (7 * DAY_IN_SECONDS), // 7 Ð´Ð½Ð¸
        'data' => array(
            'user' => array(
                'id' => $user_id
            )
        )
    );
    
    $token_json = json_encode($token_data);
    $token = base64_encode($token_json);
    
    // Ð’Ð·ÐµÐ¼Ð°Ð¼Ðµ fresh Ð´Ð°Ð½Ð½Ð¸ Ð·Ð° Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»Ñ
    $user_data = get_userdata($user_id);
    
    return array(
        'success' => true,
        'message' => 'Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ðµ ÑƒÑÐ¿ÐµÑˆÐ½Ð°',
        'token' => $token,
        'user' => array(
            'id' => $user_id,
            'username' => $user_data->user_login,
            'email' => $user_data->user_email,
            'first_name' => $user_data->first_name,
            'last_name' => $user_data->last_name,
            'role' => 'site_member',
            'phone' => get_user_meta($user_id, 'phone', true),
            'therapeutic_area' => get_user_meta($user_id, 'therapeutic_area', true),
            'disease' => get_user_meta($user_id, 'disease', true),
            'profile_completed' => false,
        )
    );
}

// ============================================
// 7. REST API ENDPOINT Ð—Ð LOGIN
// ============================================
/*
function zdravei_register_login_endpoint() {
    register_rest_route('zdravei/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'zdravei_login_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_login_endpoint');

function zdravei_login_callback($request) {
    $params = $request->get_json_params();
    
    if (empty($params['username']) || empty($params['password'])) {
        return new WP_Error('missing_credentials', 'ÐœÐ¾Ð»Ñ, Ð²ÑŠÐ²ÐµÐ´ÐµÑ‚Ðµ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 400));
    }
    
    $user = wp_authenticate($params['username'], $params['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´Ð½Ð¾ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸Ð»Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 401));
    }
    
    // Ð“ÐµÐ½ÐµÑ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° JWT Ñ‚Ð¾ÐºÐµÐ½
    $token_data = array(
        'iss' => get_bloginfo('url'),
        'iat' => time(),
        'exp' => time() + (7 * DAY_IN_SECONDS),
        'data' => array(
            'user' => array(
                'id' => $user->ID
            )
        )
    );
    
    $token_json = json_encode($token_data);
    $token = base64_encode($token_json);
    
    return array(
        'success' => true,
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'role' => implode(', ', $user->roles),
            'phone' => get_user_meta($user->ID, 'phone', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
            'disease' => get_user_meta($user->ID, 'disease', true),
            'birth_year' => get_user_meta($user->ID, 'birth_year', true),
            'gender' => get_user_meta($user->ID, 'gender', true),
            'city' => get_user_meta($user->ID, 'city', true),
            'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
        )
    );
}
*/





// ============================================
// 7. REST API ENDPOINT Ð—Ð LOGIN
// ============================================
function zdravei_register_login_endpoint() {
    register_rest_route('zdravei/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'zdravei_login_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_login_endpoint');

function zdravei_login_callback($request) {
    $params = $request->get_json_params();
    
    if (empty($params['username']) || empty($params['password'])) {
        return new WP_Error('missing_credentials', 'ÐœÐ¾Ð»Ñ, Ð²ÑŠÐ²ÐµÐ´ÐµÑ‚Ðµ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 400));
    }
    
    $user = wp_authenticate($params['username'], $params['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'ÐÐµÐ²Ð°Ð»Ð¸Ð´Ð½Ð¾ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¾ Ð¸Ð¼Ðµ Ð¸Ð»Ð¸ Ð¿Ð°Ñ€Ð¾Ð»Ð°', array('status' => 401));
    }

    // â”€â”€ ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð·Ð° Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÐ½ Ð¸Ð¼ÐµÐ¹Ð» â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    $account_status = get_user_meta($user->ID, 'account_status', true);
    if ($account_status === 'pending') {
        return new WP_REST_Response(array(
            'success'               => false,
            'requires_verification' => true,
            'message'               => 'ÐœÐ¾Ð»Ñ Ð¿Ð¾Ñ‚Ð²ÑŠÑ€Ð´ÐµÑ‚Ðµ Ð¸Ð¼ÐµÐ¹Ð» Ð°Ð´Ñ€ÐµÑÐ° ÑÐ¸ Ð¿Ñ€ÐµÐ´Ð¸ Ð´Ð° Ð²Ð»ÐµÐ·ÐµÑ‚Ðµ. ÐŸÑ€Ð¾Ð²ÐµÑ€ÐµÑ‚Ðµ Ð¿Ð¾Ñ‰Ð°Ñ‚Ð° ÑÐ¸.',
        ), 403);
    }
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    
    // Ð“ÐµÐ½ÐµÑ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° JWT Ñ‚Ð¾ÐºÐµÐ½
    $token_data = array(
        'iss' => get_bloginfo('url'),
        'iat' => time(),
        'exp' => time() + (7 * DAY_IN_SECONDS),
        'data' => array(
            'user' => array(
                'id' => $user->ID
            )
        )
    );
    
    $token_json = json_encode($token_data);
    $token = base64_encode($token_json);
    
    return array(
        'success' => true,
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'role' => implode(', ', $user->roles),
            'phone' => get_user_meta($user->ID, 'phone', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
            'disease' => get_user_meta($user->ID, 'disease', true),
            'birth_year' => get_user_meta($user->ID, 'birth_year', true),
            'gender' => get_user_meta($user->ID, 'gender', true),
            'city' => get_user_meta($user->ID, 'city', true),
            'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
        )
    );
}











// ============================================
// 8. Ð”ÐžÐ‘ÐÐ’Ð¯ÐÐ• ÐÐ CUSTOM FIELDS Ð’ ÐÐ”ÐœÐ˜Ð ÐŸÐÐÐ•Ð›Ð
// ============================================


/*
function zdravei_add_custom_user_fields($user) {
    ?>
    <h3>Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¾Ð½Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ</h3>
    <table class="form-table">
        <tr>
            <th><label for="therapeutic_area">Ð¢ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð° Ð¾Ð±Ð»Ð°ÑÑ‚</label></th>
            <td>
                <input type="text" name="therapeutic_area" id="therapeutic_area" value="<?php echo esc_attr(get_user_meta($user->ID, 'therapeutic_area', true)); ?>" class="regular-text" />
                <p class="description">Slug Ð½Ð° Ð¸Ð·Ð±Ñ€Ð°Ð½Ð°Ñ‚Ð° Ñ‚ÐµÑ€Ð°Ð¿ÐµÐ²Ñ‚Ð¸Ñ‡Ð½Ð° Ð¾Ð±Ð»Ð°ÑÑ‚ Ð¿Ñ€Ð¸ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ñ</p>
            </td>
        </tr>
        <tr>
            <th><label for="disease">ÐšÐ¾Ð½ÐºÑ€ÐµÑ‚Ð½Ð¾ Ð·Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ðµ</label></th>
            <td>
                <input type="text" name="disease" id="disease" value="<?php echo esc_attr(get_user_meta($user->ID, 'disease', true)); ?>" class="regular-text" />
                <p class="description">Ð˜Ð·Ð±Ñ€Ð°Ð½Ð¾Ñ‚Ð¾ Ð·Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ðµ Ð¿Ñ€Ð¸ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ñ</p>
            </td>
        </tr>
    </table>
    
    <h3>Ð—Ð´Ñ€Ð°Ð²Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ</h3>
    <table class="form-table">
        <tr>
            <th><label for="phone">Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½</label></th>
            <td>
                <input type="text" name="phone" id="phone" value="<?php echo esc_attr(get_user_meta($user->ID, 'phone', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="birth_year">Ð“Ð¾Ð´Ð¸Ð½Ð° Ð½Ð° Ñ€Ð°Ð¶Ð´Ð°Ð½Ðµ</label></th>
            <td>
                <input type="number" name="birth_year" id="birth_year" value="<?php echo esc_attr(get_user_meta($user->ID, 'birth_year', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="gender">ÐŸÐ¾Ð»</label></th>
            <td>
                <?php $gender = get_user_meta($user->ID, 'gender', true); ?>
                <select name="gender" id="gender">
                    <option value="">-- Ð˜Ð·Ð±ÐµÑ€ÐµÑ‚Ðµ --</option>
                    <option value="male" <?php selected($gender, 'male'); ?>>ÐœÑŠÐ¶</option>
                    <option value="female" <?php selected($gender, 'female'); ?>>Ð–ÐµÐ½Ð°</option>
                    <option value="other" <?php selected($gender, 'other'); ?>>Ð”Ñ€ÑƒÐ³Ð¾</option>
                    <option value="prefer_not_to_say" <?php selected($gender, 'prefer_not_to_say'); ?>>ÐŸÑ€ÐµÐ´Ð¿Ð¾Ñ‡Ð¸Ñ‚Ð°Ð¼ Ð´Ð° Ð½Ðµ Ð¾Ñ‚Ð³Ð¾Ð²Ð°Ñ€ÑÐ¼</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="city">Ð“Ñ€Ð°Ð´</label></th>
            <td>
                <input type="text" name="city" id="city" value="<?php echo esc_attr(get_user_meta($user->ID, 'city', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="current_conditions">ÐÐ°ÑÑ‚Ð¾ÑÑ‰Ð¸ Ð·Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ð¸Ñ</label></th>
            <td>
                <textarea name="current_conditions" id="current_conditions" rows="3" class="regular-text"><?php echo esc_textarea(get_user_meta($user->ID, 'current_conditions', true)); ?></textarea>
            </td>
        </tr>
        <tr>
            <th><label for="current_medications">ÐŸÑ€Ð¸ÐµÐ¼ Ð½Ð° Ð¼ÐµÐ´Ð¸ÐºÐ°Ð¼ÐµÐ½Ñ‚Ð¸</label></th>
            <td>
                <textarea name="current_medications" id="current_medications" rows="3" class="regular-text"><?php echo esc_textarea(get_user_meta($user->ID, 'current_medications', true)); ?></textarea>
            </td>
        </tr>
        <tr>
            <th><label for="smoking_status">ÐŸÑƒÑˆÐµÐ½Ðµ</label></th>
            <td>
                <?php $smoking = get_user_meta($user->ID, 'smoking_status', true); ?>
                <select name="smoking_status" id="smoking_status">
                    <option value="">-- Ð˜Ð·Ð±ÐµÑ€ÐµÑ‚Ðµ --</option>
                    <option value="never" <?php selected($smoking, 'never'); ?>>ÐÐ¸ÐºÐ¾Ð³Ð° Ð½Ðµ ÑÑŠÐ¼ Ð¿ÑƒÑˆÐ¸Ð»/Ð°</option>
                    <option value="former" <?php selected($smoking, 'former'); ?>>Ð‘Ð¸Ð²Ñˆ Ð¿ÑƒÑˆÐ°Ñ‡</option>
                    <option value="current" <?php selected($smoking, 'current'); ?>>ÐŸÑƒÑˆÐ° Ð² Ð¼Ð¾Ð¼ÐµÐ½Ñ‚Ð°</option>
                    <option value="occasional" <?php selected($smoking, 'occasional'); ?>>ÐŸÑƒÑˆÐ° Ñ€ÑÐ´ÐºÐ¾/ÑÐ¾Ñ†Ð¸Ð°Ð»Ð½Ð¾</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="additional_info">Ð”Ð¾Ð¿ÑŠÐ»Ð½Ð¸Ñ‚ÐµÐ»Ð½Ð° Ð·Ð´Ñ€Ð°Ð²Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ</label></th>
            <td>
                <textarea name="additional_info" id="additional_info" rows="4" class="regular-text"><?php echo esc_textarea(get_user_meta($user->ID, 'additional_info', true)); ?></textarea>
            </td>
        </tr>
    </table>
    <h3>Ð¡Ñ‚Ð°Ñ‚ÑƒÑ</h3>
    <table class="form-table">
        <tr>
            <th>Ð”Ð°Ñ‚Ð° Ð½Ð° Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ñ</th>
            <td>
                <?php 
                $reg_date = get_user_meta($user->ID, 'registration_date', true);
                echo $reg_date ? $reg_date : 'ÐÑÐ¼Ð° Ð´Ð°Ð½Ð½Ð¸';
                ?>
            </td>
        </tr>
        <tr>
            <th>ÐŸÑ€Ð¾Ñ„Ð¸Ð» Ð·Ð°Ð²ÑŠÑ€ÑˆÐµÐ½</th>
            <td>
                <?php 
                $completed = get_user_meta($user->ID, 'profile_completed', true);
                $completed_date = get_user_meta($user->ID, 'profile_completed_date', true);
                if ($completed) {
                    echo '<span style="color:green;">âœ“ Ð”Ð°</span>';
                    if ($completed_date) {
                        echo ' <small>(Ð½Ð° ' . $completed_date . ')</small>';
                    }
                } else {
                    echo '<span style="color:orange;">âœ— ÐÐµ</span>';
                }
                ?>
            </td>
        </tr>
        <tr>
            <th>Ð—Ð°ÑÐ²ÐºÐ° Ð¸Ð·Ð¿Ñ€Ð°Ñ‚ÐµÐ½Ð°</th>
            <td>
                <?php 
                $inquiry = get_user_meta($user->ID, 'clinical_inquiry_submitted', true);
                $inquiry_date = get_user_meta($user->ID, 'clinical_inquiry_date', true);
                if ($inquiry) {
                    echo '<span style="color:green;">âœ“ Ð”Ð°</span>';
                    if ($inquiry_date) {
                        echo ' <small>(Ð½Ð° ' . $inquiry_date . ')</small>';
                    }
                } else {
                    echo '<span style="color:gray;">âœ— ÐÐµ</span>';
                }
                ?>
            </td>
        </tr>
    </table>
    <?php
}
add_action('show_user_profile', 'zdravei_add_custom_user_fields');
add_action('edit_user_profile', 'zdravei_add_custom_user_fields');

function zdravei_save_custom_user_fields($user_id) {
    if (!current_user_can('edit_user', $user_id)) return false;
    
    $fields = array(
        'therapeutic_area', 
        'disease', 
        'phone', 
        'birth_year', 
        'gender', 
        'city', 
        'current_conditions', 
        'current_medications', 
        'smoking_status', 
        'additional_info'
    );
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_user_meta($user_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('personal_options_update', 'zdravei_save_custom_user_fields');
add_action('edit_user_profile_update', 'zdravei_save_custom_user_fields');
*/




// ============================================
// 9. Ð”ÐžÐ‘ÐÐ’Ð¯ÐÐ• ÐÐ ÐšÐžÐ›ÐžÐÐ˜ Ð’ Ð¡ÐŸÐ˜Ð¡ÐªÐšÐ Ð¡ ÐŸÐžÐ¢Ð Ð•Ð‘Ð˜Ð¢Ð•Ð›Ð˜
// ============================================
function zdravei_add_user_columns($columns) {
    $columns['phone'] = 'Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½';
    $columns['therapeutic_area'] = 'Ð¢ÐµÑ€Ð°Ð¿. Ð¾Ð±Ð»Ð°ÑÑ‚';
    $columns['disease'] = 'Ð—Ð°Ð±Ð¾Ð»ÑÐ²Ð°Ð½Ðµ';
    $columns['profile_completed'] = 'ÐŸÑ€Ð¾Ñ„Ð¸Ð»';
    return $columns;
}
add_filter('manage_users_columns', 'zdravei_add_user_columns');

function zdravei_show_user_column_content($value, $column_name, $user_id) {
    if ($column_name === 'phone') return get_user_meta($user_id, 'phone', true) ?: '-';
    if ($column_name === 'therapeutic_area') return get_user_meta($user_id, 'therapeutic_area', true) ?: '-';
    if ($column_name === 'disease') {
        $disease = get_user_meta($user_id, 'disease', true);
        return $disease ? '<span title="' . esc_attr($disease) . '">' . (strlen($disease) > 30 ? substr($disease, 0, 30) . '...' : $disease) . '</span>' : '-';
    }
    if ($column_name === 'profile_completed') return get_user_meta($user_id, 'profile_completed', true) ? 'âœ“' : 'âœ—';
    return $value;
}
add_filter('manage_users_custom_column', 'zdravei_show_user_column_content', 10, 3);




function zdravei_create_application($request) {
    $params = $request->get_json_params();
    
    $user = zdravei_validate_token($request);
    
    if (is_wp_error($user)) {
        return $user;
    }
    
    $user_id = $user->ID;
    
    if (empty($params['applicant_id'])) {
        return new WP_Error('missing_fields', 'Ð›Ð¸Ð¿ÑÐ²Ð° applicant_id', array('status' => 400));
    }
    
    $post_id = wp_insert_post(array(
        'post_type' => 'applications',
        'post_status' => 'publish',
        'post_title' => sprintf(
            'ÐšÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð° â€“ %s %s â€“ %s',
            sanitize_text_field($params['first_name'] ?? ''),
            sanitize_text_field($params['last_name'] ?? ''),
            date('d.m.Y H:i:s')
        ),
        'post_author' => $user_id,
    ));
    
    if (is_wp_error($post_id)) {
        return new WP_Error('application_creation_failed', 'Ð“Ñ€ÐµÑˆÐºÐ° Ð¿Ñ€Ð¸ ÑÑŠÐ·Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° ÐºÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð°Ñ‚Ð°', array('status' => 500));
    }
    
    update_post_meta($post_id, 'applicant_id', intval($params['applicant_id']));
    update_post_meta($post_id, '_applicant_id', 'field_699de2e3f1fdd');
    
    if (isset($params['target_study_id'])) {
        update_post_meta($post_id, 'target_study_id', intval($params['target_study_id']));
        update_post_meta($post_id, '_target_study_id', 'field_699de351f1fde');
    }
    
    if (isset($params['phone']) && $params['phone'] !== '') {
        update_post_meta($post_id, 'acf_phone_number', $params['phone']);
        update_post_meta($post_id, '_acf_phone_number', 'field_699de2c9683f3');
    }
    
    if (isset($params['birth_year']) && $params['birth_year'] !== '') {
        update_post_meta($post_id, 'acf_birth_year', $params['birth_year']);
        update_post_meta($post_id, '_acf_birth_year', 'field_699de2c96842c');
    }
    
    if (isset($params['gender']) && $params['gender'] !== '') {
        update_post_meta($post_id, 'acf_gender', $params['gender']);
        update_post_meta($post_id, '_acf_gender', 'field_699de2c968465');
    }
    
    if (isset($params['city']) && $params['city'] !== '') {
        update_post_meta($post_id, 'acf_city', $params['city']);
        update_post_meta($post_id, '_acf_city', 'field_699de2c96849d');
    }
    
    if (isset($params['current_diseases']) && $params['current_diseases'] !== '') {
        update_post_meta($post_id, 'acf_current_diseases', $params['current_diseases']);
        update_post_meta($post_id, '_acf_current_diseases', 'field_699de2c9684d6');
    }
    
    if (isset($params['current_medications']) && $params['current_medications'] !== '') {
        update_post_meta($post_id, 'acf_current_medications', $params['current_medications']);
        update_post_meta($post_id, '_acf_current_medications', 'field_699de2c96850e');
    }
    
    if (isset($params['smoking_status']) && $params['smoking_status'] !== '') {
        update_post_meta($post_id, 'acf_smoking_status', $params['smoking_status']);
        update_post_meta($post_id, '_acf_smoking_status', 'field_699de2c968546');
    }
    
    if (isset($params['additional_health_info']) && $params['additional_health_info'] !== '') {
        update_post_meta($post_id, 'acf_additional_health_info', $params['additional_health_info']);
        update_post_meta($post_id, '_acf_additional_health_info', 'field_699de2c96857e');
    }
    
    if (isset($params['first_name'])) {
        update_post_meta($post_id, 'first_name', sanitize_text_field($params['first_name']));
    }
    
    if (isset($params['last_name'])) {
        update_post_meta($post_id, 'last_name', sanitize_text_field($params['last_name']));
    }
    
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'ÐšÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð°Ñ‚Ð° Ðµ ÑÑŠÐ·Ð´Ð°Ð´ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾',
        'application_id' => $post_id
    ));
}


/**
 * ÐŸÑ€ÐµÐ¼Ð°Ñ…Ð²Ð° ÑÐ¾Ñ†Ð¸Ð°Ð»Ð½Ð¸ Ð¼Ñ€ÐµÐ¶Ð¸ Ð¾Ñ‚ user profile - Ð¡Ð˜Ð›ÐÐ Ð’Ð•Ð Ð¡Ð˜Ð¯
 */
function zdravei_remove_all_social_fields($contactmethods) {
    // ÐŸÑ€ÐµÐ¼Ð°Ñ…Ð²Ð°Ð¼Ðµ Ð’Ð¡Ð˜Ð§ÐšÐ˜ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¸ Ð²Ð°Ñ€Ð¸Ð°Ð½Ñ‚Ð¸
    $fields_to_remove = array(
        'url', 'website', 'web', 'site',
        'facebook', 'facebook_url', 'fb',
        'instagram', 'instagram_url', 'ig',
        'linkedin', 'linkedin_url',
        'myspace', 'myspace_url',
        'pinterest', 'pinterest_url',
        'soundcloud', 'soundcloud_url',
        'tumblr', 'tumblr_url',
        'wikipedia', 'wikipedia_url',
        'twitter', 'twitter_url', 'x',
        'youtube', 'youtube_url', 'yt'
    );
    
    foreach ($fields_to_remove as $field) {
        unset($contactmethods[$field]);
    }
    
    return $contactmethods;
}
add_filter('user_contactmethods', 'zdravei_remove_all_social_fields', 999);

/**
 * Ð¡ÐºÑ€Ð¸Ð²Ð° ÑÐ¾Ñ†Ð¸Ð°Ð»Ð½Ð¸ Ð¼Ñ€ÐµÐ¶Ð¸ Ð¿Ð¾Ð»ÐµÑ‚Ð° Ñ CSS
 */
function zdravei_hide_social_fields_css() {
    ?>
    <style>
        /* Ð¡ÐºÑ€Ð¸Ð²Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÑÐ¾Ñ†Ð¸Ð°Ð»Ð½Ð¸ Ð¼Ñ€ÐµÐ¶Ð¸ Ð² user profile */
        .user-url-wrap,
        .user-facebook-wrap,
        .user-instagram-wrap,
        .user-linkedin-wrap,
        .user-myspace-wrap,
        .user-pinterest-wrap,
        .user-soundcloud-wrap,
        .user-tumblr-wrap,
        .user-wikipedia-wrap,
        .user-twitter-wrap,
        .user-youtube-wrap,
        tr.user-url-wrap,
        tr.user-facebook-wrap,
        tr.user-instagram-wrap,
        tr.user-linkedin-wrap,
        tr.user-myspace-wrap,
        tr.user-pinterest-wrap,
        tr.user-soundcloud-wrap,
        tr.user-tumblr-wrap,
        tr.user-wikipedia-wrap,
        tr.user-twitter-wrap,
        tr.user-youtube-wrap {
            display: none !important;
        }
    </style>
    <?php
}
add_action('admin_head-user-edit.php', 'zdravei_hide_social_fields_css');
add_action('admin_head-profile.php', 'zdravei_hide_social_fields_css');

/**
 * Ð¡ÐºÑ€Ð¸Ð²Ð° "Personal Options" ÑÐµÐºÑ†Ð¸ÑÑ‚Ð° Ð¾Ñ‚ user profile
 */
function zdravei_hide_personal_options() {
    ?>
    <style>
        /* Ð¡ÐºÑ€Ð¸Ð²Ð° Ñ†ÑÐ»Ð°Ñ‚Ð° Personal Options ÑÐµÐºÑ†Ð¸Ñ */
        .user-admin-color-wrap,
        .user-comment-shortcuts-wrap,
        .show-admin-bar,
        h2:contains('Ð›Ð¸Ñ‡Ð½Ð¸ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸'),
        h2:contains('Personal Options') {
            display: none !important;
        }
        
        /* Ð¡ÐºÑ€Ð¸Ð²Ð° Ñ†ÑÐ»Ð°Ñ‚Ð° ÑÐµÐºÑ†Ð¸Ñ Ñ ÐºÐ»Ð°Ñ */
        #your-profile .user-admin-color-wrap,
        #your-profile .user-comment-shortcuts-wrap,
        #your-profile .show-admin-bar.user-admin-bar-front-wrap {
            display: none !important;
        }
        
        /* Ð¡ÐºÑ€Ð¸Ð²Ð° Ð·Ð°Ð³Ð»Ð°Ð²Ð¸ÐµÑ‚Ð¾ "Ð›Ð¸Ñ‡Ð½Ð¸ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸" */
        #your-profile h2:first-of-type {
            display: none !important;
        }
    </style>
    <script>
        jQuery(document).ready(function($) {
            // Ð¡ÐºÑ€Ð¸Ð²Ð° Ð·Ð°Ð³Ð»Ð°Ð²Ð¸ÐµÑ‚Ð¾ "Ð›Ð¸Ñ‡Ð½Ð¸ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸" Ñ JavaScript
            $('#your-profile h2').each(function() {
                if ($(this).text().includes('Ð›Ð¸Ñ‡Ð½Ð¸ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸') || $(this).text().includes('Personal Options')) {
                    $(this).hide();
                }
            });
        });
    </script>
    <?php
}
add_action('admin_head-user-edit.php', 'zdravei_hide_personal_options');
add_action('admin_head-profile.php', 'zdravei_hide_personal_options');

/**
 * Endpoint Ð·Ð° ÑÑŠÐ·Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° ÐºÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð° Ð·Ð° Ð·Ð´Ñ€Ð°Ð² Ð´Ð¾Ð±Ñ€Ð¾Ð²Ð¾Ð»ÐµÑ†
 */
function zdravei_create_healthy_application($request) {
    $params = $request->get_json_params();
    
    // Validate required fields
    /*
    $required_fields = ['acf_first_name', 'acf_last_name', 'acf_phone_number', 'acf_email', 
                       'acf_gender', 'acf_birth_date', 'acf_height', 'acf_weight',
                       'acf_nicotine_use', 'acf_allergies', 'acf_asthma', 
                       'acf_other_medical_conditions', 'acf_current_medications',
                       'acf_trial_type', 'acf_marketing_channel'];
                       */
                      $required_fields = ['acf_first_name', 'acf_last_name', 'acf_phone_number', 'acf_email', 
                   'acf_gender', 'acf_birth_date', 'acf_height', 'acf_weight',
                   'acf_nicotine_use', 'acf_alergies', 'acf_astma', 
                   'acf_other_medical_conditions', 'acf_current_medications',
                   'acf_trial_type', 'acf_marketing_channel'];
    
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_fields', "Ð›Ð¸Ð¿ÑÐ²Ð° Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¾ Ð¿Ð¾Ð»Ðµ: $field", array('status' => 400));
        }
    }
    
    // Create post
    $post_id = wp_insert_post(array(
        'post_type' => 'healthy_applications',
        'post_status' => 'publish',
        'post_title' => sprintf(
            'ÐšÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð° â€“ %s %s â€“ %s',
            sanitize_text_field($params['acf_first_name']),
            sanitize_text_field($params['acf_last_name']),
            date('d.m.Y H:i:s')
        ),
    ));
    
    if (is_wp_error($post_id)) {
        return new WP_Error('application_creation_failed', 'Ð“Ñ€ÐµÑˆÐºÐ° Ð¿Ñ€Ð¸ ÑÑŠÐ·Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° ÐºÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð°Ñ‚Ð°', array('status' => 500));
    }
    
    // Save ACF fields
$field_mappings = array(
    'acf_first_name'               => 'field_69b57b00888d4',
    'acf_last_name'                => 'field_69b57b13888d5',
    'acf_phone_number'             => 'field_69b177ee04880',
    'acf_email'                    => 'field_69b57b8e888d6',
    'acf_gender'                   => 'field_69b177ee048cc',
    'acf_birth_date'               => 'field_69b177ee048b8',
    'acf_height'                   => 'field_69b57bba888d7',
    'acf_weight'                   => 'field_69b57bd3888d8',
    'acf_nicotine_use'             => 'field_69b57c0c888d9',
    'acf_alergies'                 => 'field_69b57c52888da',   // â† fixed
    'acf_astma'                    => 'field_69b57c7f888db',   // â† fixed
    'acf_other_medical_conditions' => 'field_69b57cc9888dc',
    'acf_current_medications'      => 'field_69b177ee04972',
    'acf_current_medications_text' => 'field_69b57dbc888dd',
    'acf_trial_type'               => 'field_69b57df0888de',
    'acf_marketing_channel'        => 'field_69b57e53888df',
    'acf_marketing_field_other'    => 'field_69ca69841ff27',   // â† added
);
    
    foreach ($field_mappings as $field_name => $field_key) {
        if (isset($params[$field_name]) && $params[$field_name] !== '') {
            update_post_meta($post_id, $field_name, $params[$field_name]);
            update_post_meta($post_id, '_' . $field_name, $field_key);
        }
    }
    
    // ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð´Ð¸Ñ‚ÐµÐ»ÐµÐ½ Ð¸Ð¼ÐµÐ¹Ð» ÐºÑŠÐ¼ ÐºÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚Ð°
    $candidate_email = sanitize_email( $params['acf_email'] ?? '' );
    if ( ! empty( $candidate_email ) ) {
        $user_subject = 'Ð‘Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ð¸Ð¼ Ð’Ð¸ Ð·Ð° ÐºÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð°Ñ‚Ð°!';
        $user_message  = "Ð—Ð´Ñ€Ð°Ð²ÐµÐ¹Ñ‚Ðµ,\n\n";
        $user_message .= "Ð Ð°Ð´Ð²Ð°Ð¼Ðµ ÑÐµ, Ñ‡Ðµ Ð²ÐµÑ‡Ðµ ÑÑ‚Ðµ Ñ‡Ð°ÑÑ‚ Ð¾Ñ‚ 'Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚' â€” Ð´Ð¾Ð±Ñ€Ðµ Ð´Ð¾ÑˆÐ»Ð¸! ðŸ˜Š\n\n";
        $user_message .= "Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ð’Ð¸ Ðµ ÑƒÑÐ¿ÐµÑˆÐ½Ð° Ð¸ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»ÑŠÑ‚ Ð’Ð¸ Ðµ Ð°ÐºÑ‚Ð¸Ð²ÐµÐ½. Ð©Ð¾Ð¼ ÑÐµ Ð¿Ð¾ÑÐ²Ð¸ ÐºÐ»Ð¸Ð½Ð¸Ñ‡Ð½Ð° Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð°, ÐºÐ¾ÑÑ‚Ð¾ ÑÑŠÐ²Ð¿Ð°Ð´Ð° Ñ Ñ‚Ð¾Ð²Ð°, ÐºÐ¾ÐµÑ‚Ð¾ ÑÑ‚Ðµ Ð¾Ñ‚Ð±ÐµÐ»ÑÐ·Ð°Ð»Ð¸, Ñ‰Ðµ Ð’Ð¸ Ð¿Ð¸ÑˆÐµÐ¼, Ð·Ð° Ð´Ð° Ð’Ð¸ Ñ€Ð°Ð·ÐºÐ°Ð¶ÐµÐ¼ Ð¿Ð¾Ð²ÐµÑ‡Ðµ Ð¸ Ð´Ð° Ð’Ð¸ Ð´Ð°Ð´ÐµÐ¼ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ Ð´Ð° ÑÐµ Ð²ÐºÐ»ÑŽÑ‡Ð¸Ñ‚Ðµ.\n\n";
        $user_message .= "Ð’ ÑÐ»ÑƒÑ‡Ð°Ð¹, Ñ‡Ðµ ÑÐµ ÑÐµÑ‚Ð¸Ñ‚Ðµ Ð·Ð° Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ», Ð±Ð»Ð¸Ð·ÑŠÐº Ð¸Ð»Ð¸ Ð¿Ð¾Ð·Ð½Ð°Ñ‚, Ð·Ð° ÐºÐ¾Ð³Ð¾Ñ‚Ð¾ ÑÑŠÑ‰Ð°Ñ‚Ð° Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ñ Ð±Ð¸ Ð±Ð¸Ð»Ð° Ð¿Ð¾Ð»ÐµÐ·Ð½Ð°, Ñ‰Ðµ ÑÐµ Ñ€Ð°Ð´Ð²Ð°Ð¼Ðµ Ð´Ð° Ð¼Ñƒ ÑÐ¿Ð¾Ð´ÐµÐ»Ð¸Ñ‚Ðµ Ð·Ð° Ð½Ð°Ñ.\n\n";
        $user_message .= "Ð‘Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ð¸Ð¼ Ð’Ð¸, Ñ‡Ðµ ÑÑ‚Ðµ Ñ‚ÑƒÐº!\n\n";
        $user_message .= "ÐŸÐ¾Ð·Ð´Ñ€Ð°Ð²Ð¸, Ð•ÐºÐ¸Ð¿ÑŠÑ‚ Ð½Ð° 'Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚'";
        wp_mail( $candidate_email, $user_subject, $user_message, array( 'Content-Type: text/plain; charset=UTF-8' ) );
    }

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'ÐšÐ°Ð½Ð´Ð¸Ð´Ð°Ñ‚ÑƒÑ€Ð°Ñ‚Ð° Ðµ ÑÑŠÐ·Ð´Ð°Ð´ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾',
        'application_id' => $post_id
    ));
}

/**
 * Ð ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° endpoint Ð·Ð° healthy applications
 */
add_action('rest_api_init', function () {
    register_rest_route('zdravei/v1', '/create-healthy-application', array(
        'methods' => 'POST',
        'callback' => 'zdravei_create_healthy_application',
        'permission_callback' => '__return_true'
    ));
});



// =============================================
// FORGOT PASSWORD & RESET PASSWORD ENDPOINTS
// =============================================

add_action('rest_api_init', function () {
    register_rest_route('zdravei/v1', '/forgot-password', array(
        'methods'             => 'POST',
        'callback'            => 'zdravei_forgot_password',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('zdravei/v1', '/reset-password', array(
        'methods'             => 'POST',
        'callback'            => 'zdravei_reset_password',
        'permission_callback' => '__return_true',
    ));
});

function zdravei_forgot_password(WP_REST_Request $request) {
    $params = $request->get_json_params();
    $email  = sanitize_email($params['email'] ?? '');

    if (empty($email)) {
        return new WP_Error('missing_email', 'ÐœÐ¾Ð»Ñ Ð²ÑŠÐ²ÐµÐ´ÐµÑ‚Ðµ Ð¸Ð¼ÐµÐ¹Ð» Ð°Ð´Ñ€ÐµÑ.', array('status' => 400));
    }

    $user = get_user_by('email', $email);

    if (!$user) {
        return array(
            'success' => true,
            'message' => 'ÐÐºÐ¾ Ð¸Ð¼ÐµÐ¹Ð»ÑŠÑ‚ Ðµ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½, Ñ‰Ðµ Ð¿Ð¾Ð»ÑƒÑ‡Ð¸Ñ‚Ðµ Ð»Ð¸Ð½Ðº Ð·Ð° Ð½ÑƒÐ»Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð¿Ð°Ñ€Ð¾Ð»Ð°Ñ‚Ð°.',
        );
    }

    $reset_key = get_password_reset_key($user);
    if (is_wp_error($reset_key)) {
        return new WP_Error('key_error', 'Ð“Ñ€ÐµÑˆÐºÐ° Ð¿Ñ€Ð¸ Ð³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° ÐºÐ»ÑŽÑ‡.', array('status' => 500));
    }

    $reset_url = 'https://zdraveibolest.bg/reset-password?key=' . rawurlencode($reset_key)
               . '&login=' . rawurlencode($user->user_login);

    $subject = 'ÐÑƒÐ»Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð¿Ð°Ñ€Ð¾Ð»Ð° â€“ Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚';
    $message  = "Ð—Ð´Ñ€Ð°Ð²ÐµÐ¹Ñ‚Ðµ,\n\n";
    $message .= "ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ…Ð¼Ðµ Ð·Ð°ÑÐ²ÐºÐ° Ð·Ð° Ð½ÑƒÐ»Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð¿Ð°Ñ€Ð¾Ð»Ð°Ñ‚Ð° Ð·Ð° Ð²Ð°ÑˆÐ¸Ñ Ð°ÐºÐ°ÑƒÐ½Ñ‚.\n\n";
    $message .= "ÐšÐ»Ð¸ÐºÐ½ÐµÑ‚Ðµ Ð½Ð° ÑÐ»ÐµÐ´Ð½Ð¸Ñ Ð»Ð¸Ð½Ðº, Ð·Ð° Ð´Ð° Ð·Ð°Ð´Ð°Ð´ÐµÑ‚Ðµ Ð½Ð¾Ð²Ð° Ð¿Ð°Ñ€Ð¾Ð»Ð°:\n\n";
    $message .= $reset_url . "\n\n";
    $message .= "Ð›Ð¸Ð½ÐºÑŠÑ‚ Ðµ Ð²Ð°Ð»Ð¸Ð´ÐµÐ½ Ð·Ð° 24 Ñ‡Ð°ÑÐ°.\n\n";
    $message .= "ÐÐºÐ¾ Ð½Ðµ ÑÑ‚Ðµ Ð¸Ð·Ð¿Ñ€Ð°Ñ‚Ð¸Ð»Ð¸ Ñ‚Ð°Ð·Ð¸ Ð·Ð°ÑÐ²ÐºÐ°, Ð¿Ñ€Ð¾ÑÑ‚Ð¾ Ð¸Ð³Ð½Ð¾Ñ€Ð¸Ñ€Ð°Ð¹Ñ‚Ðµ Ñ‚Ð¾Ð·Ð¸ Ð¸Ð¼ÐµÐ¹Ð».\n\n";
    $message .= "Ð¡ ÑƒÐ²Ð°Ð¶ÐµÐ½Ð¸Ðµ,\nÐ•ÐºÐ¸Ð¿ÑŠÑ‚ Ð½Ð° Ð—Ð´Ñ€Ð°Ð²Ðµ Ð¸ Ð‘Ð¾Ð»ÐµÑÑ‚";

    wp_mail($user->user_email, $subject, $message, array('Content-Type: text/plain; charset=UTF-8'));

    return array(
        'success' => true,
        'message' => 'ÐÐºÐ¾ Ð¸Ð¼ÐµÐ¹Ð»ÑŠÑ‚ Ðµ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð°Ð½, Ñ‰Ðµ Ð¿Ð¾Ð»ÑƒÑ‡Ð¸Ñ‚Ðµ Ð»Ð¸Ð½Ðº Ð·Ð° Ð½ÑƒÐ»Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð¿Ð°Ñ€Ð¾Ð»Ð°Ñ‚Ð°.',
    );
}

function zdravei_reset_password(WP_REST_Request $request) {
    $params       = $request->get_json_params();
    $key          = sanitize_text_field($params['key']  ?? '');
    $login        = sanitize_user($params['login']       ?? '');
    $new_password = $params['new_password']               ?? '';

    if (empty($key) || empty($login) || empty($new_password)) {
        return new WP_Error('missing_params', 'Ð›Ð¸Ð¿ÑÐ²Ð°Ñ‚ Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¸ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¸.', array('status' => 400));
    }

    if (strlen($new_password) < 6) {
        return new WP_Error('weak_password', 'ÐŸÐ°Ñ€Ð¾Ð»Ð°Ñ‚Ð° Ñ‚Ñ€ÑÐ±Ð²Ð° Ð´Ð° Ðµ Ð¿Ð¾Ð½Ðµ 6 ÑÐ¸Ð¼Ð²Ð¾Ð»Ð°.', array('status' => 400));
    }

    $user = check_password_reset_key($key, $login);
    if (is_wp_error($user)) {
        return new WP_Error('invalid_key', 'Ð›Ð¸Ð½ÐºÑŠÑ‚ Ðµ Ð½ÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ð¸Ð»Ð¸ Ð²ÐµÑ‡Ðµ Ðµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð½.', array('status' => 400));
    }

    reset_password($user, $new_password);

    return array(
        'success' => true,
        'message' => 'Паролата е сменена успешно.',
    );
}

/**
 * Yoast SEO: persist sidebar meta through the block editor REST save pipeline.
 * Fixes meta description/title/focus keyword appearing saved but reverting on reload.
 */
add_action('init', 'zdravei_register_yoast_rest_meta_fields');
function zdravei_register_yoast_rest_meta_fields() {
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
