import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Table = ({ columns, data, actions = [], routeName, onDeleteSuccess, customActions }) => {
  // Fungsi untuk menangani delete API
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/${routeName}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus data");
        }

        alert("Data berhasil dihapus");
        onDeleteSuccess(id);
      } catch (error) {
        console.error("Error saat menghapus:", error);
        alert("Gagal menghapus data");
      }
    }
  };

  // Fungsi untuk mengubah nama kolom (menghapus "_" dan membuat setiap kata kapital)
  const formatColumnName = (name) => {
    return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="table-responsive">
      <table className="display table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>No</th>
            {columns.map((col, index) => (
              <th key={index} style={{ textTransform: "capitalize" }}>{formatColumnName(col)}</th>
            ))}
            {actions.length > 0 || customActions ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions.length > 0 || customActions ? 2 : 1)} className="text-center">
                Tidak ada data yang tersedia.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
                {(actions.length > 0 || customActions) && (
                  <td>
                    {actions.includes("show") && (
                      <Link to={`/admin/${routeName}/${row.id}`} className="btn btn-info btn-sm mx-1">
                        Show
                      </Link>
                    )}
                    {actions.includes("update") && (
                      <Link to={`/admin/${routeName}/form/${row.id}`} className="btn btn-warning btn-sm mx-1">
                        Update
                      </Link>
                    )}
                    {actions.includes("delete") && (
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </button>
                    )}
                    {/* Render Custom Actions Jika Ada */}
                    {customActions && customActions(row.id)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
  routeName: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  customActions: PropTypes.func, 
};

export default Table;
