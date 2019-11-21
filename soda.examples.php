<?php


  //EXAMPLE: preprocess a view
  $result= views_get_view_result('VIEW_MACHINE_NAME', 'VIEW_DISPLAY');
  if (!empty($result)) {
    foreach ($result as $row) {
      $title=$row->_entity->getTitle();
      $url=$row->_entity->toUrl()->toString();
      $item=['label'=>$title, 'url'=>$url];
      $variables['ultimas_paginas'][] = $item;
    }
  }

  //EXAMPLE: preprocess images
  $node=$variables['elements']['#node'];
  $image_entity= Media::load($node->FIELD_NAME->first()->target_id);
  $variables['image']['src']  = MediaSrc::getSrc($image_entity, 'IMAGES_STYLE_NAME');
  $variables['image']['alt'] = MediaSrc::getAlt($image_entity);


//EXAMPLE: preprocess a paragraph
function MODULE_preprocess_paragraph__PARAGRAPH_MACHINE_NAME(&$variables){
  $paragraph = $variables['paragraph'];
  $variables['titular']['label']=$paragraph->TITLE_FIELD_NAME->value;
  $variables['boton']['label']=$paragraph->LINK_FIELD_NAME->title;
  $variables['boton']['url']=$paragraph->LINK_FIELD_NAME->uri;
}
