# mkEditor
Markdown Editor

SimpleMDEがとても使いやすかったのですがあんまりエディタ部分にStyleが適用されるのが好きではなかったので、
単純なエディタ機能と＋簡単にマークダウンが記載できるようなものが欲しかったので作ってみました。
まだ全然作成者以外が使えるような状態にはなっていませんが、だれかこれを見た人からアドバイスを頂ければ、
誤った方向に進まないかなぁと思いGitHubに投稿しておきます。

このEditorは正直言えば全然作りがSimpleとは言えず、エディタ部分は(Ace)[https://ace.c9.io/]で構築されて、
プレビュー機能は(marked.js)[https://marked.js.org]によって作成されます。

エディタの初期化
var mk = new mkEditor({
  element : 'mark',
  toolbar_position: 'top',
  theme: 'chrome',
  autoDownloadmkEditor_CSS: true,
  mkEditor_CSS_Path: 'mkEditor.css',
  'deactivate_item': ['bold'],
  autoDownloadFontAwesome: true,
});

初期化時に使用する引数  

|Name|Description|
|:---|:---|
| element |エディタを展開するエレメントのIDを指定する。(型:str)|
| toolbar_position|ツールバーの位置を指定する。種類:[`top`, `right`, `bottom`, `left`]。デフォルト:`top`。(型:str)|
| toolbar|表示するアイテムを配列で指定する|
| addToolbar_item|標準のアイテム以外を追加する|
| deactivate_item|非表示にしたいアイテムを配列で渡す|
| theme|エディターのテーマを指定する。種類:別表1。デフォルト:`xcode`。(型:str)|
| autoDownloadFontAwesome|FontAwesomeをダウンロードするかどうかの判定。デフォルト:`true`。(型:bool)|
| autoDownloadMookMDE_CSS|CSSをダウンロードするかどうかの判定。デフォルト:`false`。(型:bool)|
| mkEditor_CSS_Path|CSSファイルの格納場所を指定する。未指定の場合は`css/mookMDE.css`を読み込む。(型:str)|
| automkEditorAddCSSText|CSSをスタイルタグでヘッダに追加する。デフォルト:`true`(型:bool)|



別表1(計:36)

|Name|
|:---|
|chrome|
|clouds|   
|crimson_editor|   
|dawn|  
|dreamweaver|  
|katzenmilch|  
|eclipse|  
|github|  
|iplastic|  
|kuroir|  
|sqlserver|  
|textmate|  
|tomorrow|  
|xcode|
|ambiance|  
|chaos|  
|clouds_midnight| 
|dracula|  
|gruvbox|
|idle_fingers|
|kr_theme|
|merbivore|
|merbivore_soft|
|mono_industrial
|monokai|
|pastel_on_dark|
|terminal|
|tomorrow_night|
|tomorrow_night_eighties|
|twilight|
|vibrant_ink|  
|gob|
|cobalt|
|solarized_dark|
|tomorrow_night_blue|



--標準のクリックイベント関数を拡張する場合は再度初期化して実行してください  
_extendedを抜けば初期関数そのものを編集できます。  
* MookMDE.toggleBold_extended = function(){}  
* MookMDE.toggleItalic_extended = function(){}  
* MookMDE.toggleStrikethrough_extended = function(){}  
* MookMDE.toggleHeadingSmaller_extended = function(){}  
* MookMDE.toggleCodeBlock_extended = function(){}  
* MookMDE.toggleBlockquote_extended = function(){}  
* MookMDE.toggleUnorderedList_extended = function(){}  
* MookMDE.toggleOrderedList_extended = function(){}  
* MookMDE.drawLink_extended = function(){}  
* MookMDE.drawImage_extended = function(){}  
* MookMDE.drawTable_extended = function(){}  
* MookMDE.drawHorizontalRule_extended = function(){}  
* MookMDE.togglePreview_extended = function(){}  
* MookMDE.toggleSideBySide_extended = function(){}  
* MookMDE.toggleFullScreen_extended = function(){}  
* MookMDE.toggleFullScreen_extended = function(){}  
* MookMDE.settingTheme_main_extended = function(){}     // テーマの選択画面の拡張  
* MookMDE.settingTheme_clicked_extended = function(){}  // 実際にテーマを変更する関数の拡張  
* MookMDE.undo_extended = function(){}  
* MookMDE.redo_extended = function(){}  





今後の予定
* まずは各テーマごとのCSSを作成する。現在の対応はテーマと背景色だけなのでプレビューが実質白背景しか使えない。
* できればエディタ部分をもっと軽くするために独自で実装できればベストだけどTextAreaはあまり好ましくないので検討中。
* 全体的に欲しい機能を追加していっただけだからコードが雑すぎるので修正が必要。
