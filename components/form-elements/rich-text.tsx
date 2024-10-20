import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";

const RichText: React.FC = () => {
  const config = {
    toolbarButtons: ["bold", "italic", "underline", "paragraphFormat", "align", "markdown", "undo", "redo"]
  };
  return <FroalaEditorComponent config={config} tag="textarea" />;
};
export default RichText;
