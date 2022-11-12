
tinymce.init({
    selector: "#mytextarea",
    width: 755,
    height: 500,
    resize: false,
    autosave_ask_before_unload: false,
    powerpaste_allow_local_images: true,
    plugins: [
        'a11ychecker advcode advlist anchor autolink codesample fullscreen help image imagetools',
        ' lists link media noneditable powerpaste preview',
        ' searchreplace table tinymcespellchecker visualblocks wordcount'
    ],
    toolbar:
        'a11ycheck undo redo | bold italic | forecolor backcolor | table codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive',
    spellchecker_dialog: true,
    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});


