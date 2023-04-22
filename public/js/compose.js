const composeContent = document.getElementById("composeContent");
composeContent.setSelectionRange(end, end);
composeContent.focus();
const select_ol = 0;
const select_ul = 0;


function insertFormatting(tag) {
    const cursor = composeContent.selectionStart;
    x= composeContent.value;
    composeContent.value = x.slice(0, cursor)+tag+x.slice(cursor);
    composeContent.setSelectionRange(cursor+4, cursor+4);
    composeContent.focus();
};



function add_bold() {
    insertFormatting("<b>  </b>");
};
function add_italic() {
    insertFormatting("<i>  </i>");
};
function add_underline() {
    insertFormatting("<u>  </u>");
}
function add_strike() {
    insertFormatting("<s>  </s>");
}
function add_ul() {
    const cursor = composeContent.selectionStart;
    x= composeContent.value;
    const tag=`
<ul>
<li>  </li>
</ul>
`;
    composeContent.value = x.slice(0, cursor)+tag+x.slice(cursor);
    composeContent.setSelectionRange(cursor+11, cursor+11);
    composeContent.focus();
}
function add_ol() {
    const cursor = composeContent.selectionStart;
    x= composeContent.value;
    const tag=`
<ol>
<li>  </li>
</ol>
`;
    composeContent.value = x.slice(0, cursor)+tag+x.slice(cursor);
    composeContent.setSelectionRange(cursor+11, cursor+11);
    composeContent.focus();
}