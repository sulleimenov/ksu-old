<? include "lang/langselect.phtml"; ?>
<? include "include/head.phtml"; ?>
<header class="header header-inner">
	<div class="container">
		<? include "top-header.phtml"; ?>
	</div>
</header>
<div class="container">
	<div class="breadcrumbs">
		<?= $this->render($this->macros('core', 'navibar'), 'library/navibar') ?>
	</div>
</div>

<?php var_dump($variables); ?>

<? if ($variables['full:page']->getAltName() == 'newslist') { ?>
	<section>
		<div class="container">
			<div class="title title-m"><?= $last_news ?></div>
			<div class="tape__wrapper">
				<?= $this->render($this->macros('news', 'lastlist', array('newslist', null, 9, false)), 'for-blocks/news'); ?>
			</div>
		</div>
	</section>
<? } else { ?>
	<section id="news-item">
		<div class="container">
			<h2 class="news-title"><?= $variables['@header']; ?></h2>
			<?
			$hierarchy = umiHierarchy::getInstance();
			$page = $hierarchy->getElement($variables['@pageId']);
			$content = $page->getValue('anons');
			$words_per_minute = "150"; // Время чтения слов в минуту
			$img_per_minute = "0"; // Время чтения изображения в секундах
			$img_numb = preg_match_all("~<img~i", $content, $result_numb); // Плучаем общее количество изображений в тексте
			$text_read = round(count(preg_split("/[\s,]+/", $content)) / $words_per_minute, 1); // Получаем общее время чтения текста

			$img_read = floor((count($result_numb[0]) * $img_per_minute) / 60); // Получаем общее время чтения изображений
			$all_read = $img_read + $text_read; // Получаем общее время чтения (текст + изображения)
			function decl_of_numb($all_numb, $titles)
			{
				$cases = array(2, 0, 1, 1, 1, 2);
				return $all_numb . " " . $titles[($all_numb % 100 > 4 && $all_numb % 100 < 20) ? 2 : $cases[min($all_numb % 10, 5)]];
			}

			echo "Читать: " . decl_of_numb(round($all_read), array("мин", "мин", "мин"));

			?>
			<div class="entry-container">
				<?
				$hierarchy = umiHierarchy::getInstance();
				$page = $hierarchy->getElement($variables['@pageId']);
				print_r($page->getValue('anons'));
				?>
			</div>
			<? if ($page->getValue('pic_list')) { ?>
				<div class="images">
					<?
					foreach ($page->getValue('pic_list') as $newspic) {
						//print_r(substr($newspic->getFilePath(),1));
						$data = $this->macros('system', 'makeThumbnail', array($newspic->getFilePath(), auto, 800));
						print_r('<a class="mfp_img" href="' . $data['src'] . '"><img src="' . $data['src'] . '" alt="Alt"></a>');
					}
					?>
				<? } ?>
				</div>
		</div>
	</section>
<? } ?>
<!---------------- Футер ---------------->
<? include 'footer.phtml'; ?>