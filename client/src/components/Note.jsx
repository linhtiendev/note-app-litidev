import React, { useEffect, useState } from 'react'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { draftToHtml } from 'draftjs-to-html'

export default function Note() {
    const note = {
        id: '999',
        content: '<p>this is new note</p>'
    }

    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty()
    })

    const [rawHTML, setRawHTML] = useState(note.content)

    useEffect(() => {
        const blockFromHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blockFromHTML.contentBlocks,
            blockFromHTML.entityMap
        )
        setEditorState(EditorState.createWithContent(state))
    }, [note.id])

    useEffect(() => {
        setRawHTML(note.content)
    }, [note.content])

    const handleOnChange = (e) => {
        setEditorState(e);
        setRawHTML(draftToHtml(convertToRaw(e.getCurrnetContent())));
    }

  return (
    <Editor 
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder='Write something!'
    />
  )
}
