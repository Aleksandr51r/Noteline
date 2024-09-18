import React, { useState, useCallback, useMemo } from "react"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css" // Обязательно
import "./TextEditor-style.css"

function TextEditor({ className, content, onChange }) {

  const [value, setValue] = useState(content || "")

  // Обработчик изменения значения
  const handleChange = useCallback(
    (value) => {
      setValue(value)
      if (onChange) {
        onChange(value) 
      }
    },
    [onChange]
  )

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      indentWithTabs: true,
    }
  }, [])

  return (
    <div className={`text-editor ${className}`}>
      <SimpleMDE
        value={value}
        onChange={handleChange}
        options={autofocusNoSpellcheckerOptions}
      />
    </div>
  )
}

export default TextEditor

// import React, { useRef, useState } from "react"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"
// import "./TextEditor-style.css"

// function TextEditor({ className, content, onChange }) {
//   const [value, setValue] = useState(content)

//   const toolbarOptions = [
//     [{ header: 1 }, { header: 2 }],
//     ["bold", "italic", "underline", "strike"],
//     ["blockquote", "code-block"],
//     // ["link", "image", "formula"],
//     ["link", "image", "formula"],

//     [{ size: [] }],
//     [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//     [{ script: "sub" }, { script: "super" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ direction: "rtl" }],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     ["clean"],
//   ]

//   const handleChange = (value) => {
//     setValue(value)
//     if (onChange) {
//       onChange(value)
//     }
//   }

//   // const handleChange = (value) => {
//   //   setValue(value);
//   //   // Получение чистого текста
//   //   const tempDiv = document.createElement("div");
//   //   tempDiv.innerHTML = value;
//   //   const plainText = tempDiv.innerText || tempDiv.textContent || "";
//   //   if (onChange) {
//   //     onChange(plainText); // Передаем чистый текст в onChange
//   //   }
//   // };

//   const module = {
//     toolbar: toolbarOptions,
//   }

//   return (
//     <ReactQuill
//       modules={module}
//       theme='snow'
//       value={value}
//       onChange={handleChange}
//     />
//   )
// }

// export default TextEditor
