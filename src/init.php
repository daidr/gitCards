<?php
if (!defined('ABSPATH')) {
    exit;
}

add_action('enqueue_block_assets', 'gitcards_cgb_block_assets');
add_action('enqueue_block_editor_assets', 'gitcards_cgb_editor_assets');
add_shortcode('gitcard', 'shortcode_gitcards');

function gitcards_cgb_block_assets()
{
    // Scripts.
    wp_enqueue_script('gitcards-core', GITCARDS_URL . '/js/gitcards.js', array('jquery'), true);

    // Styles.
    wp_enqueue_style('gitcards-cgb-style-css', GITCARDS_URL . '/dist/blocks.style.build.css', array('wp-editor'));
    wp_enqueue_style('font-awesome-icon-css', 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css', array());
}

function gitcards_cgb_editor_assets()
{
    // Scripts.
    wp_enqueue_script('gitcards-cgb-block-js', GITCARDS_URL . '/dist/blocks.build.js', array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), true);

    // Styles.
    wp_enqueue_style('gitcards-cgb-block-editor-css', GITCARDS_URL . '/dist/blocks.editor.build.css', array('wp-edit-blocks'));
}

function shortcode_gitcards($atts, $content = null)
{
    $a = shortcode_atts(array(
        'type' => '1',
        'url' => 'https://github.com/dxz2002/gitCards',
    ), $atts);
    return '<!--GITCARDS v' . GITCARDS_VERSION . ' start--><section class="wp-block-gitcards-gitcards-block" data-gitsite="' . $a["type"] . '" data-giturl="' . $a["url"] . '"><div class="gitcard-body"><div class="gitspinner"><div class="gitrect1"></div><div class="gitrect2"></div><div class="gitrect3"></div><div class="gitrect4"></div><div class="gitrect5"></div></div></div></section><!--GITCARDS end-->';
}
