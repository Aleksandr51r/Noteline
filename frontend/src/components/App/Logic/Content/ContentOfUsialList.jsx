// import React from "react"
// import { selectSelectedCategory } from "../../../../redux/slices/contentSlice"
// import { useSelector } from "react-redux"
// import Note from "../Notes/Note"

// function ContentOfUsialList() {
//   const selectedCategory = useSelector(selectSelectedCategory)

//   return (
//     <>
//       {Object.values(selectedCategory.content)
//         .reverse()
//         .map((item) => (
//           <Note
//             id={item.id}
//             key={item.id}
//             level={item.level}
//             title={item.title}
//             noteContent={item.content}
//             nestedNotes={item.nestedNotes}
//             show_nested_notes={item.show_nested_notes}
//             path={item.path}
//             parentId={item.id}
//             is_favorite={item.is_favorite}
//           />
//         ))}
//     </>
//   )
// }
// export default ContentOfUsialList
