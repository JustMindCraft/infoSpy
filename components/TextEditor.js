import dynamic from 'next/dynamic';

const ReactQuillWithNoSSR = dynamic(
  () => import('react-quill'),
  {
    ssr: false
  }
)
dynamic(
    () => import('./TextEditor.css'),
    {
      ssr: false
    }
)

class TextEditor extends React.Component {
    modules = {
        toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list':'bullet'}, {'indent': '-1'}, {'index': '+1'}],
            ['link', 'image', 'video', 'formula'],
            [{ 'align': [false, "center", "right"] }],
            [{ 'color': [false, "red", "blue", "grey", "black", "white"] }], 
            [{ 'background': [false, "red", "blue", "grey","black", "white"] }],
            ['clean']
          ]
      }
    
    

    render(){
        return (
          <React.Fragment>
                <ReactQuillWithNoSSR value={this.props.value} onChange={this.props.getEditorText} id="max" modules={this.modules}
                />
          </React.Fragment>
          
        )
    }
}

export default TextEditor;