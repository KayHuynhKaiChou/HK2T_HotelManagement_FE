import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorHk2tProps {
    placeholder ?: string;
    textEditor : string;
    onChangeTextEditor : (textEditor : string) => void;
}

export default function RichTextEditorHk2t(props : RichTextEditorHk2tProps) {
    const {
        placeholder = 'please typing text word',
        textEditor,
        onChangeTextEditor
    } = props;

    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6] }],
          ["bold", "italic", "underline", "strike"],
          [{ font: [] }],
          [{ align: ["right", "center", "justify"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [{ color: ["red", "#fff", "black", "green", "#785412"] }],
          [{ background: ["red", "#fff", "black", "green", "#785412"] }]
        ]
    };
    
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "font"
    ];

    return (
        <ReactQuill
            theme="snow" 
            formats={formats}
            modules={modules}
            placeholder={placeholder}
            value={textEditor} 
            onChange={onChangeTextEditor}
        />
    )
}
