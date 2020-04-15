///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        ColorPicker = baidu.editor.ui.ColorPicker = function (options){
            this.initOptions(options);
            this.noColorText = this.noColorText || this.editor.getLang("clearColor");
            this.initUIBase();
        };

    ColorPicker.prototype = {
        getHtmlTpl: function (){
            return genColorPicker(this.noColorText,this.editor);
        },
        _onTableClick: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.fireEvent('pickcolor', color);
            }
        },
        _onTableOver: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.getDom('preview').style.backgroundColor = color;
            }
        },
        _onTableOut: function (){
            this.getDom('preview').style.backgroundColor = '';
        },
        _onPickNoColor: function (){
            this.fireEvent('picknocolor');
        }
    };
    utils.inherits(ColorPicker, UIBase);

    var COLORS = (
        'ffffff,ffd7d5,ffdaa9,fffed5,d4fa00,73fcd6,a5c8ff,ffacd5,ff7faa,' +
        'd6d6d6,ffacaa,ffb995,fffb00,73fa79,00fcff,78acfe,d84fa9,ff4f79,' +
        'b2b2b2,d7aba9,ff6827,ffda51,00d100,00d5ff,0080ff,ac39ff,ff2941,' +
        '888888,7a4442,ff4c00,ffa900,3da742,3daad6,0052ff,7a4fd6,d92142,' +
        '000000,7b0c00,ff4c41,d6a841,407600,007aaa,021eaa,797baa,ab1942').split(',');

    function genColorPicker(noColorText,editor){
        var html = '<div id="##" class="edui-colorpicker %%">' +
            '<div class="edui-colorpicker-topbar edui-clearfix">' +
            '<div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div>' +
            '<div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">'+ noColorText +'</div>' +
            '</div>' +
            '<table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0">' +
            '<tr style="font-size: 13px;line-height: 25px;color:#9a9a9a;"><td colspan="10" style="padding-top: 2px;padding-bottom: 5px;">'+editor.getLang("themeColor")+'</td> </tr>'+
            '<tr>';
        for (var i=0; i<COLORS.length; i++) {
            if (i && i%9 === 0) {
                html += '</tr><tr>';
            }
            html += i<54 ? '<td style="padding: 2px;"><a hidefocus title="'+COLORS[i]+'" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell"' +
                ' data-color="#'+ COLORS[i] +'"'+
                ' style="background-color:#'+ COLORS[i] +';border:solid #e7e7eb;border-width:1px;"' +
                '></a></td>':'';
        }
        html += '</tr></table></div>';
        return html;
    }
})();
