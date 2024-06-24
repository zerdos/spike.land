import { css } from "@emotion/react";
import React from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";

const folder = {
  name: "",
  children: [
    {
      name: "src",
      children: [{ name: "index.js" }, { name: "styles.css" }],
    },
    {
      name: "node_modules",
      children: [
        {
          name: "react-accessible-treeview",
          children: [{ name: "index.js" }],
        },
        { name: "react", children: [{ name: "index.js" }] },
      ],
    },
    {
      name: ".npmignore",
    },
    {
      name: "package.json",
    },
    {
      name: "webpack.config.js",
    },
  ],
};

const data = flattenTree(folder);

const directoryStyles = css`
  background: rgb(36, 36, 36);
  font-family: monospace;
  font-size: 16px;
  color: white;
  user-select: none;
  padding: 20px;
  border-radius: 0.4em;

  .tree,
  .tree-node,
  .tree-node-group {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tree-branch-wrapper,
  .tree-node__leaf {
    outline: none;
  }

  .tree-node {
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .tree-node--focused {
    background: rgba(255, 255, 255, 0.2);
  }

  .tree-node--selected {
    background: rgba(48, 107, 176);
  }
`;

const treeNodeContentStyles = (level: number) =>
  css`
  display: flex;
  align-items: center;
  padding-left: ${level * 20}px !important;
`;

const iconStyles = css`
  vertical-align: middle;
  padding-right: 5px;
`;

function DirectoryTreeView() {
  return (
    <div css={directoryStyles}>
      <TreeView
        data={data}
        aria-label="directory tree"
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          getNodeProps,
          level,
        }) => (
          <div {...getNodeProps()} css={treeNodeContentStyles(level - 1)}>
            {isBranch ? <FolderIcon isOpen={isExpanded} /> : <FileIcon filename={element.name} />}
            {element.name}
          </div>
        )}
      />
    </div>
  );
}

const FolderIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) =>
  isOpen ? <FaRegFolderOpen css={iconStyles} color="e8a87c" /> : <FaRegFolder css={iconStyles} color="e8a87c" />;

const FileIcon: React.FC<{ filename: string }> = ({ filename }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <DiJavascript css={iconStyles} color="yellow" />;
    case "css":
      return <DiCss3 css={iconStyles} color="turquoise" />;
    case "json":
      return <FaList css={iconStyles} color="yellow" />;
    case "npmignore":
      return <DiNpm css={iconStyles} color="red" />;
    default:
      return null;
  }
};

export default DirectoryTreeView;
