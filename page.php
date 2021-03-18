<!DOCTYPE html>
/*
 * @Descripttion: 
 * @version: 
 * @Author: Michael Sun @ www.cctv3.net
 * @Date: 2021-03-17 21:45:53
 * @LastEditors: Michael Sun
 * @LastEditTime: 2021-03-18 08:34:08
 */
<html lang="zh-CN">

<head>
    <?php $this->need('public/include.php'); ?>
    <!-- 独立页面需要用到CSS及JS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism-tomorrow.css">
    <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js"></script>
    <script src="http://www.cctv3.net/MyCDN/plugin/prism.js"></script>
    <script src="<?php $this->options->themeUrl('assets/js/joe.post&page.min.js'); ?>"></script>
</head>

<body>
    <div id="Joe">
        <?php $this->need('public/header.php'); ?>
        <div class="joe_container">
            <div class="joe_main">
                <div class="joe_detail" data-cid="<?php echo $this->cid ?>">
                    <?php $this->need('public/batten.php'); ?>
                    <?php $this->need('public/article.php'); ?>
                    <?php $this->need('public/handle.php'); ?>
                    <?php $this->need('public/copyright.php'); ?>
                </div>
                <?php $this->need('public/comment.php'); ?>
            </div>
            <?php $this->need('public/aside.php'); ?>
        </div>
        <?php $this->need('public/footer.php'); ?>
    </div>
</body>

</html>