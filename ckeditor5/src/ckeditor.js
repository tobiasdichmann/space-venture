/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";

class Editor extends ClassicEditor { }

// Plugins to include in the build.
Editor.builtinPlugins = [
  Bold,
  Essentials,
  FontColor,
  Indent,
  Italic,
  Link,
  List,
  Paragraph,
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "fontColor",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "undo",
      "redo",
    ],
  },
  fontColor: {
    colors: [
      {
        color: "#12B9B6",
        label: "Light Blue",
      },
      {
        color: "#808080",
        label: "Grey",
      },
      {
        color: "#162E44",
        label: "Dark Blue",
      },
      {
        color: "#11263A",
        label: "Very Dark Blue",
      },
      {
        color: "#000000",
        label: "Black",
      }
    ]
  },
  language: "da",
};

export default Editor;
