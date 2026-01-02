<?php

/**
 * Plugin Name: Spectre UI WordPress
 * Description: Loads the Spectre UI CSS bundle for frontend and block editor.
 * Version: 0.1.0
 * Author: phcdevworks
 */

if (! defined('ABSPATH')) {
	exit;
}

function spectre_ui_wordpress_enqueue_frontend_styles()
{
	$css_path = plugin_dir_path(__FILE__) . 'assets/spectre-ui.css';
	$css_url  = plugins_url('assets/spectre-ui.css', __FILE__);
	$version  = file_exists($css_path) ? filemtime($css_path) : null;

	wp_register_style('spectre-ui', $css_url, array(), $version);
	wp_enqueue_style('spectre-ui');
}

add_action('wp_enqueue_scripts', 'spectre_ui_wordpress_enqueue_frontend_styles');
