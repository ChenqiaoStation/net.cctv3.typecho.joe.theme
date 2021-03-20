<?php
/* 过滤短代码 */
require_once('short.php');

/* 过滤评论回复 */
function _parseCommentReply($text)
{
    if (strip_tags($text)) {
        $text = _parseReply($text);
        $text = preg_replace('/\{!{(.*?)\}!}/', '<img class="lazyload draw_image" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="$1" onerror="javascript: this.src=\'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\';" alt="画图"/>', $text);
        echo $text;
    } else {
        echo "该回复疑似异常，已被系统拦截！";
    }
}

/* 过滤表情 */
function _parseReply($text)
{
    $text = preg_replace_callback(
        '/\:\:\((\d{1,})@*(Alibaba|Baidu|Wechat).png*\)/is',
        function ($match) {
            return '<img class="owo_image lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="http://www.cctv3.net/Facebook/'.$match[2].'/'.$match[1].'@'.$match[2].'.png" onerror="javascript: this.src=\'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\';" alt="表情"/>';
        },
        $text
    );
    return $text;
}

/* 格式化留言回复 */
function _parseLeavingReply($text)
{
    if (strip_tags($text)) {
        $text = strip_tags($text);
        $text = _parseReply($text);
        $text = preg_replace('/\{!\{(.*?)\}!\}/', '<img class="draw_image" src="$1" alt="画图"/>', $text);
        echo $text;
    } else {
        echo "该回复疑似异常，已被系统拦截！";
    }
}

/* 格式化侧边栏回复 */
function _parseAsideReply($text, $type = true)
{
    if (strip_tags($text)) {
        $text = strip_tags($text);
        $text = preg_replace('~{!{.*~', '# 图片回复', $text);
        if ($type) echo _parseReply($text);
        else echo $text;
    } else {
        echo "该回复疑似异常，已被系统拦截！";
    }
}

/* 过滤侧边栏最新回复的跳转链接 */
function _parseAsideLink($link)
{
    echo str_replace("#", "?scroll=", $link);
}
