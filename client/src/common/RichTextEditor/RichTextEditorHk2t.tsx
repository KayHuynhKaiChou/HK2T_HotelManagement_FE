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

    return (
        <ReactQuill
            theme="snow" 
            placeholder={placeholder}
            value={textEditor} 
            onChange={onChangeTextEditor}
        />
    )
}
