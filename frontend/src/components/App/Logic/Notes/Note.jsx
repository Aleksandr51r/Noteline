import React, { useState } from "react"
import "./Note-style.css"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { RxTriangleRight } from "react-icons/rx"
import { GoBookmark } from "react-icons/go"
import { IoMdOptions } from "react-icons/io"
import { AiFillTags } from "react-icons/ai"
import { ImPencil2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux"
import {
  toggleAddingNewNestedNote,
  selectIsAddingNewNestedNote,
} from "../../../../redux/slices/contentSlice"
import NewNote from "./NewNote"
import ModalWindow from "../../../ModalWindow/ModalWindow"

function Note({
  level,
  title,
  // noteContent,
  nestedNotes,
  showNestedNotes,
  path,
  className,
}) {
  const dispatch = useDispatch()
  const [areNestedNotesVisible, setAreNestedNotesVisible] =
    useState(showNestedNotes)
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [thatNoteSelected, setThatNoteSelected] = useState(false)
  const isAddingNewNestedNote = useSelector(selectIsAddingNewNestedNote)
  const romeDigitsLevel = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
  }
  // const nestedNotes = Object.values(nestedNotes)
  const onClose = () => {
    setThatNoteSelected(false)
  }
  const noteContent = ""
  /*
  const noteContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos officia, rem eaque, praesentium explicabo ratione quis voluptate esse distinctio maiores facere, quo laborum tenetur dolorem odio a sapiente. Aspernatur repellendus necessitatibus minima laboriosam corrupti? Consequatur nulla, aperiam eius, a, hic sit adipisci aliquam nam aut labore praesentium facilis illum consectetur dolorum saepe dignissimos excepturi iusto debitis? Maiores, doloremque ullam. Veniam, sequi! Qui soluta nobis consequuntur possimus excepturi dignissimos tempora quod ipsum? Nisi facere unde a molestias, est illo saepe, iusto adipisci quia reprehenderit eius facilis architecto aliquid omnis placeat error repudiandae fuga quod dicta vitae rerum inventore similique quo? Iure nobis aut assumenda, voluptas non beatae rem pariatur excepturi exercitationem temporibus perferendis sit dolor enim, nulla ducimus quas, cum asperiores ut autem repellat eaque alias repudiandae maxime molestiae. Assumenda sequi facilis velit eveniet mollitia? Nemo maxime eos impedit totam cupiditate culpa ut minus, animi autem dignissimos iste molestiae, hic error vitae dolores tempore excepturi adipisci reprehenderit! Similique tempora, maxime illo omnis laudantium necessitatibus aliquid fuga ullam, consequatur alias praesentium culpa molestiae dolores vel rem vitae quidem delectus labore hic voluptas! Ducimus excepturi perspiciatis, eligendi eaque et, eveniet officiis repellendus, labore sit consequuntur doloribus dolores. Quam cupiditate magnam aliquid, quo dolor commodi quos animi dignissimos! Quia quas, temporibus ipsa praesentium adipisci cupiditate, esse repudiandae beatae laudantium expedita velit aliquid ipsum tempora explicabo corrupti odio obcaecati recusandae ducimus ea maxime odit eum placeat repellendus. Delectus culpa sit autem deleniti necessitatibus vitae fugiat praesentium? Illo, accusantium voluptatem! Vero consequuntur vitae sunt illum quae reprehenderit rerum nobis, laudantium porro quas amet itaque provident nemo inventore recusandae libero culpa perspiciatis? Libero, consequatur? Consequatur, esse ducimus aliquid consequuntur et iure fuga, ex pariatur quam earum excepturi dolores ipsum dolor facilis eum quod eaque error facere at! Perferendis repellat architecto cum similique optio. Sint, quod maiores."
  */

  const handleNoteFormClick = () => {
    setThatNoteSelected(true)
    dispatch(toggleAddingNewNestedNote())
  }
  const handleToggleNestedNotes = () => {
    setAreNestedNotesVisible(!areNestedNotesVisible)
  }
  const handleAddNoteContent = () => {
    setIsNoteOpen(true)
  }

  const isHiddenTriangeOfWrapp = Object.values(nestedNotes).length > 0
  const closeAndClear = () => {
    setIsNoteOpen(false)
  }

  return (
    <>
      {isNoteOpen && (
        <div className='overlay ' onClick={closeAndClear}>
          <div className='opened-note'>
            <div>{title}</div>
            <div>{noteContent}</div>
          </div>
        </div>
      )}
      <div className={`note-main ${className}`}>
        <div
          className={`note note-in-list ${
            areNestedNotesVisible ? "expanded" : "note-hidden"
          }`}
        >
          <div className='note-wrap note-part'>
            <div className='note-dummy note-part '></div>
            <button
              className={`btn-empty note-wrap note-part ${
                isHiddenTriangeOfWrapp ? "wrap-note-expanded" : "wrap-hidden"
              }`}
              onClick={handleToggleNestedNotes}
            >
              <RxTriangleRight
                className={` ${
                  areNestedNotesVisible ? "wrap-expanded" : "note-hidden"
                }`}
              />
            </button>
          </div>
          <div
            className='note-level note-part'
            onClick={handleToggleNestedNotes}
          >
            {romeDigitsLevel[level]}
          </div>

          <div
            className={`note-btn-extend note-part ${
              level <= 9 ? "" : "hidden"
            }`}
          >
            <NoteForm
              additionalClassName='little-btn-tool-icon'
              onClick={handleNoteFormClick}
            />
            {/* <TodoForm additionalClassName='little-btn-tool-icon' /> */}
          </div>
          {/* <div className='note-dummy note-part '></div> */}

          <div className='note-title note-part '>
            <span className='note-title-span'>{title}</span>
          </div>

          <div
            className='note-text note-part note-part-open'
            onClick={handleAddNoteContent}
          >
            <span className='note-part-open-span'>
              {noteContent ? noteContent.slice(0, 25) + "..." : <ImPencil2 />}
            </span>
          </div>

          <div className='note-option note-part'>
            <button className='btn-empty '>
              <GoBookmark />
            </button>
            <button className='btn-empty '>
              <IoMdOptions />
            </button>
            <button className='btn-empty '>
              <AiFillTags />
            </button>
          </div>
        </div>

        <div
          className={`notes-nested ${areNestedNotesVisible ? "expanded" : ""}`}
        >
          {isAddingNewNestedNote && thatNoteSelected ? (
            <NewNote parentPath={path} onClose={onClose} />
          ) : null}
          <div
            className={`notes-list ${areNestedNotesVisible ? "expanded" : ""}`}
          >
            {Object.values(nestedNotes).length > 0 &&
              areNestedNotesVisible &&
              Object.values(nestedNotes)
                .reverse()
                .map((item) => (
                  <Note
                    className='nestedItem'
                    id={item.id}
                    key={item.id}
                    level={item.level}
                    title={item.title}
                    noteContent={item.noteContent}
                    nestedNotes={item.nestedNotes}
                    showNestedNotes={item.showNestedNotes}
                    path={item.path}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Note
