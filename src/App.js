import { Fragment, useContext, useEffect, useState } from "react";
import "./App.css";
import { DataContext } from "./store/provider";
import { images } from "./themes/images";

function App() {
  const [expandedId, setExpandedId] = useState(null);
  const {
    apis,
    isLoading,
    isError,
    getAllApis,
    updateApiDetails,
    deleteApiDetails,
  } = useContext(DataContext);

  const [sortingAsc, setSortingAsc] = useState(true);
  const [page, setPage] = useState(1);
  //Get all the apis data on the first mount
  useEffect(() => {
    getAllApis();
  }, []);

  const onRowClick = (event, id) => {
    if (event.target.classList.contains("edit-icon")) {
      updateApiDetails(id, { name: "Updated Name" });
    } else if (event.target.classList.contains("delete-icon")) {
      deleteApiDetails(id);
    } else {
      setExpandedId((prevId) => (prevId === id ? null : id));
    }
  };

  const renderHederRow = (item) => {
    const columns = [
      { key: "id", title: "Id" },
      { key: "Name", title: "Name", sortable: true },
      { key: "Description", title: "Description" },
      { key: "Type", title: "Type" },
      { key: "Created At", title: "Created At" },
      { key: "action", title: "" },
    ];

    const onNameHeaderClick = () => {
      const orderBy = !sortingAsc ? "desc" : null;
      const sortby = orderBy && "name";
      getAllApis(page, sortby, orderBy);
      setSortingAsc((prev) => !prev);
    };

    return (
      <tr className="table-header__row">
        {columns.map((field) => (
          <th
            key={field.key}
            onClick={field.title === "Name" ? onNameHeaderClick : null}
            className={field.title === "Name" ? "cursor-pointer" : ""}
          >
            <span className="flex flex-row items-center">
              {field.title}
              {field.sortable && (
                <span className="flex flex-col ml-4">
                  <img
                    src={images.sortDown}
                    alt="down"
                    width="10"
                    height="10"
                    className="transform rotate-180"
                    style={{ opacity: sortingAsc ? 1 : 0.5 }}
                  />
                  <img
                    src={images.sortDown}
                    alt="down"
                    width="10"
                    height="10"
                    style={{ opacity: !sortingAsc ? 1 : 0.5 }}
                  />
                </span>
              )}
            </span>
          </th>
        ))}
      </tr>
    );
  };

  const renderRow = (item) => {
    const newObj = {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type,
      createdAt: item.createdAt,
      action: (
        <span className="flex flex-row">
          <img
            src={images.edit}
            alt="edit"
            width={24}
            height={24}
            className=" max-w-[24px] mr-4 edit-icon"
          />
          <img
            src={images.trashCan}
            alt="delete"
            width="24"
            height="24"
            className=" max-w-[24px] delete-icon"
          />
        </span>
      ),
    };

    return (
      <Fragment key={item.id}>
        <tr
          className="table-body__row border-t border-t-stone-300"
          onClick={(e) => onRowClick(e, item.id)}
        >
          {Object.values(newObj).map((value, i) => (
            <td key={newObj.id + Math.random(i)} className="table-cell">
              {value}
            </td>
          ))}
        </tr>
        {expandedId === item.id && (
          <tr className=" bg-slate-200">
            <td colSpan={5}>{item.description}</td>
          </tr>
        )}
      </Fragment>
    );
  };

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const onNextPage = () => {
    setPage((prev) => prev + 1);
    getAllApis(page + 1);
  };

  const onPrevPage = () => {
    setPage((prev) => !prev < 1 && prev - 1);
    getAllApis(page - 1);
  };

  return (
    <div className="App flex flex-col">
      <table className="table-wrapper">
        <thead>{apis.length > 0 && renderHederRow(apis[0])}</thead>
        <tbody>{apis.map((item) => renderRow(item))}</tbody>
      </table>
      <div className="text-white text-end w-4/5  pr-8 my-4 flex justify-around">
        <button
          onClick={onPrevPage}
          className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
        >
          <img
            src={images.expandArrow}
            alt="down"
            width="24"
            height="24"
            className="transform rotate-90"
          />
        </button>
        <button
          onClick={onNextPage}
          className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
        >
          <img
            src={images.expandArrow}
            alt="down"
            width="24"
            height="24"
            className="transform -rotate-90"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
