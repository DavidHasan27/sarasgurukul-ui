import {
  faArchive,
  faTags,
  faTrashArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

const ImageActionMenu = ({
  children,
  index,
  onDelete,
  onArchive,
  onAddTag,
}: any) => {
  return (
    <Menu>
      <MenuHandler>{children}</MenuHandler>
      <MenuList placeholder={undefined} className="p-0">
        <MenuItem
          placeholder={undefined}
          className="p-0"
          onClick={(e: any) => {
            console.log("Menu1");
            onArchive(index);
            e.stopPropagation();
          }}
        >
          <div className="flex flex-row items-center px-2 py-2 hover:bg-blue-gray-100">
            <FontAwesomeIcon
              icon={faArchive}
              size="2x"
              className="text-red-400"
            />
            <label className="block text-sm text-gray-600 text-left font-semibold ml-2">
              Archive File
            </label>
          </div>
        </MenuItem>
        <MenuItem
          placeholder={undefined}
          className="p-0"
          onClick={(e) => {
            console.log("Menu2");
            onDelete(index);
            e.stopPropagation();
          }}
        >
          <div className="flex flex-row items-center hover:bg-blue-gray-100 px-2 py-2">
            <FontAwesomeIcon
              icon={faTrashArrowUp}
              size="2x"
              className="text-red-400"
            />

            <label className="block text-sm text-gray-600 text-left font-semibold ml-2 ">
              Delete Files
            </label>
          </div>
        </MenuItem>
        <MenuItem
          placeholder={undefined}
          className="p-0"
          onClick={(e) => {
            console.log("Menu3");
            onAddTag(index);
            e.stopPropagation();
          }}
        >
          <div className="flex flex-row items-center hover:bg-blue-gray-100 px-2 py-2">
            <FontAwesomeIcon icon={faTags} size="2x" className="text-red-400" />
            <label className="block text-sm text-gray-600 text-left font-semibold ml-2 ">
              Add Tag
            </label>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ImageActionMenu;
