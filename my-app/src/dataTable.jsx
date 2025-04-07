import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./dataTable.css";

const DataTableComponent = () => {
  const DEFAULT_AVATAR = "/icons/Avatar 313.png";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [newRow, setNewRow] = useState({
    customerName: "",
    company: "",
    orderValue: "",
    orderDate: new Date().toISOString().split("T")[0],
    status: "New",
    avatar: "/icons/default-avatar.png",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const columns = [
    {
      name: "CUSTOMER NAME",
      selector: (row) => row.customerName,
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={row.avatar}
            alt="Avatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/icons/default-avatar.png";
            }}
          />
          {row.customerName}
        </div>
      ),
    },
    {
      name: "COMPANY",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "ORDER VALUE",
      selector: (row) => row.orderValue,
      sortable: true,
      format: (row) => `$${row.orderValue}`,
    },
    {
      name: "ORDER DATE",
      selector: (row) => row.orderDate,
      sortable: true,
      cell: (row) => (
        <span>{new Date(row.orderDate).toLocaleDateString()}</span>
      ),
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`status-badge ${row.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <button
          onClick={() => {
            setSelectedRow(row);
            setEditedRow({ ...row });
            setIsModalOpen(true);
          }}
          className="edit-button"
        >
          <img
            src="/icons/edit.png"
            alt="Edit"
            style={{ width: "16px", height: "16px" }}
          />
        </button>
      ),
      ignoreRowClick: true,
      $allowOverflow: true,
      $button: true,
      width: "60px",
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://67f3f732cbef97f40d2cdc6f.mockapi.io/dataTable"
      );
      const apiData = await response.json();

      setData(apiData);
      setTotalRows(apiData.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Thêm dữ liệu mới qua API
  const addData = async (newData) => {
    const dataWithAvatar = {
      ...newData,
      avatar: DEFAULT_AVATAR,
    };
    try {
      setIsSaving(true);
      const response = await fetch(
        "https://67f3f732cbef97f40d2cdc6f.mockapi.io/dataTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add data");
      }

      const addedItem = await response.json();
      setData([...data, addedItem]);
      setTotalRows(totalRows + 1);
      return true;
    } catch (error) {
      console.error("Error adding data:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Cập nhật dữ liệu qua API
  const updateData = async (id, updatedData) => {
    try {
      setIsSaving(true);
      const response = await fetch(
        `https://67f3f732cbef97f40d2cdc6f.mockapi.io/dataTable/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      setData(
        data.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating data:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isModalOpen) {
      setEditedRow((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewRow((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddNew = () => {
    setNewRow({
      customerName: "",
      company: "",
      orderValue: "",
      orderDate: new Date().toISOString().split("T")[0],
      status: "New",
      avatar: DEFAULT_AVATAR,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveNew = async () => {
    if (!newRow.customerName || !newRow.company) {
      alert("Please fill in required fields");
      return;
    }

    const success = await addData(newRow);
    if (success) {
      setIsAddModalOpen(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!editedRow) return;

    const success = await updateData(editedRow.id, editedRow);
    if (success) {
      setIsModalOpen(false);
    }
  };

  // Custom styles cho bảng
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8f9fa",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #e9ecef",
        },
      },
    },
  };

  return (
    <div className="data-table-container">
      <div className="report-header">
        <div className="report-title">
          <img
            src="/icons/File text 1.png"
            alt="Report"
            className="report-icon"
          />
          <h3>Detailed report</h3>
        </div>
        <div className="report-actions">
          <button className="icon-button" onClick={handleAddNew}>
            <img src="/icons/bookmark.png" alt="Add" />
            <span>Add</span>
          </button>
          <button className="icon-button">
            <img src="/icons/Download.png" alt="Export" />
            <span>Export</span>
          </button>
          <button className="icon-button">
            <img src="/icons/Move up.png" alt="Import" />
            <span>Import</span>
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        progressPending={loading}
        pagination
        paginationTotalRows={totalRows}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
      />

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Row</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close-button"
                disabled={isSaving}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              {editedRow && (
                <div>
                  <div className="modal-row">
                    <span className="modal-label">Customer Name:</span>
                    <input
                      type="text"
                      name="customerName"
                      value={editedRow.customerName || ""}
                      onChange={handleInputChange}
                      className="modal-input"
                    />
                  </div>
                  <div className="modal-row">
                    <span className="modal-label">Company:</span>
                    <input
                      type="text"
                      name="company"
                      value={editedRow.company || ""}
                      onChange={handleInputChange}
                      className="modal-input"
                    />
                  </div>
                  <div className="modal-row">
                    <span className="modal-label">Order Value:</span>
                    <input
                      type="number"
                      name="orderValue"
                      value={editedRow.orderValue || ""}
                      onChange={handleInputChange}
                      className="modal-input"
                    />
                  </div>
                  <div className="modal-row">
                    <span className="modal-label">Order Date:</span>
                    <input
                      type="date"
                      name="orderDate"
                      value={
                        new Date(editedRow.orderDate)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={handleInputChange}
                      className="modal-input"
                    />
                  </div>
                  <div className="modal-row">
                    <span className="modal-label">Status:</span>
                    <select
                      name="status"
                      value={editedRow.status || ""}
                      onChange={handleInputChange}
                      className="modal-input"
                    >
                      <option value="New">New</option>
                      <option value="In-progress">In-progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-button"
                disabled={isSaving}
              >
                Close
              </button>
              <button
                onClick={handleSaveChanges}
                className="modal-button primary"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm mới */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Row</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="modal-close-button"
                disabled={isSaving}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div>
                <div className="modal-row">
                  <span className="modal-label">Customer Name:</span>
                  <input
                    type="text"
                    name="customerName"
                    value={newRow.customerName}
                    onChange={handleInputChange}
                    className="modal-input"
                    required
                  />
                </div>
                <div className="modal-row">
                  <span className="modal-label">Company:</span>
                  <input
                    type="text"
                    name="company"
                    value={newRow.company}
                    onChange={handleInputChange}
                    className="modal-input"
                    required
                  />
                </div>
                <div className="modal-row">
                  <span className="modal-label">Order Value:</span>
                  <input
                    type="number"
                    name="orderValue"
                    value={newRow.orderValue}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>
                <div className="modal-row">
                  <span className="modal-label">Order Date:</span>
                  <input
                    type="date"
                    name="orderDate"
                    value={newRow.orderDate}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>
                <div className="modal-row">
                  <span className="modal-label">Status:</span>
                  <select
                    name="status"
                    value={newRow.status}
                    onChange={handleInputChange}
                    className="modal-input"
                  >
                    <option value="New">New</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="modal-button"
                disabled={isSaving}
              >
                Close
              </button>
              <button
                onClick={handleSaveNew}
                className="modal-button primary"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save New"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTableComponent;
