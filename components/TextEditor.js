import dynamic from 'next/dynamic';

const ReactQuillWithNoSSR = dynamic(
  () => import('react-quill'),
  {
    ssr: false
  }
)


dynamic(
    () => import('react-quill/dist/quill.snow.css'),
    {
      ssr: false
    }
);
dynamic(
    () => import('./TextEditor.css'),
    {
      ssr: false
    }
)

class TextEditor extends React.Component {
    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
          ]
      }
    
    formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
    'list', 'bullet', 'indent',
    'link', 'image'
    ]

    render(){
        return (
            <div>
                <ReactQuillWithNoSSR modules={this.modules}
                formats={this.formats} />
            </div>
        )
    }
}

export default TextEditor;