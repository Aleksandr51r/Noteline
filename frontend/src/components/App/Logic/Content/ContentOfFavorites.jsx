// import React from "react"
// import { selectFavoritesNotes } from "../../../../redux/slices/contentSlice"
// import { useSelector } from "react-redux"
// import Note from "../Notes/Note"

// function ContentOfFavorites() {
//   const listOfFavorite = useSelector(selectFavoritesNotes)
//   console.log("listOfFavorite", listOfFavorite)

//   listOfFavorite &&
//     Object.values(listOfFavorite)
//       .reverse()
//       .map((item) => {
//         return (
//           <Note
//             id={item.id}
//             key={item.id}
//             level={item.level}
//             title={item.title}
//             noteContent={item.content}
//             is_favorite={item.is_favorite}
//             isFavoriteNote={true}
//           />
//         )
//       })
// }

// export default ContentOfFavorites
