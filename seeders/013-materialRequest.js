import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  Row, Col, Card, CardBody, Alert,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";
import Select from "react-select";
import {
  useMaterialRequestCreateMutation,
  useMaterialRequestGetAllMutation,
  useMaterialRequestUpdateMutation,
} from "Service/Api";
import {
  ConfirmModal,
  Loader,
  MaterialRequestState,
  TableComponent,
  TableFilter,
  fetchData,
  handleDataSubmit,
  materialRequestColumns
} from "utils";
import "../Tables/datatables.scss";
import { MaterialRequestReducer } from "Service/Reducer";
import { validateMaterialRequest } from "utils/validationHelpers";

const MaterialList = () => {
  const [state, dispatch] = useReducer(MaterialRequestReducer, MaterialRequestState);
  const [GetAllData] = useMaterialRequestGetAllMutation();
  const [Update] = useMaterialRequestUpdateMutation();
  const [Create] = useMaterialRequestCreateMutation();

  const handlePageChange = useCallback(pageNumber => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: pageNumber,
    });
  }, []);

  const handleSiteChange = useCallback(siteId => {
    dispatch({
      type: "SET_SELECTED_SITE",
      payload: siteId,
    });
  }, []);

  const handleStatusToggle = useCallback(async () => {
    const updatedData = {
      user: 1,
      id: state.statusToggleModal?.materialId,
      m_status: state.statusToggleModal?.currentStatus,
    };

    await handleDataSubmit(
      dispatch,
      state,
      updatedData,
      validateMaterialRequest,
      Update,
      Create,
      () => fetchData(dispatch, GetAllData, {
        ...state,
        siteId: state.selectedSiteId,
      })
    );
    dispatch({ type: 'CLOSE_STATUS_TOGGLE_MODAL' });
  }, [state.statusToggleModal, state.selectedSiteId, Update, Create, GetAllData, state]);

  const handleEntriesChange = useCallback((e) => {
    dispatch({
      type: 'SET_ENTRIES_PER_PAGE',
      payload: e.target.value
    });
  }, []);

  const handleSearchChange = useCallback((e) => {
    dispatch({
      type: 'SET_SEARCH_TERM',
      payload: e.target.value
    });
  }, []);

  const handleStatusFilterChange = useCallback((status) => {
    dispatch({
      type: "SET_STATUS_FILTER",
      payload: status,
    });
  }, []);

  const toggleStatusDropdown = useCallback(() => {
    dispatch({ type: "TOGGLE_STATUS_DROPDOWN" });
  }, []);

  useEffect(() => {
    fetchData(dispatch, GetAllData, {
      ...state,
      siteId: state.selectedSiteId,
    });
  }, [state.entriesPerPage, state.currentPage, state.searchTerm, state.selectedSiteId, GetAllData]);

  const data = useMemo(() => ({
    columns: materialRequestColumns,
    rows: state.tableData?.map(material => ({
      ...material,
      status: (
        material.transfer === 1 ? (
          <Select
            value={{ label: material.m_status, value: material.m_status }}
            options={state.statusOptions.filter(option =>
              material.m_status === "Pending"
                ? option.value !== "Pending"
                : option.value === "Pending"
            )}
            onChange={(e) => {
              dispatch({
                type: 'OPEN_STATUS_TOGGLE_MODAL',
                payload: { id: material.id, m_status: e.value },
              });
            }}
            classNamePrefix="select2-selection"
          />
        ) : (
          <span>{material.m_status}</span>
        )
      ),
      materialName: material.MaterialMainInventory?.name || "N/A",
      materialCode: material.MaterialMainInventory?.code || "N/A",
      materialHsnCode: material.MaterialMainInventory?.hsn_code || "N/A",
      materialRentPrice: material.MaterialMainInventory?.unit_rent_price || "N/A",
      MaterialSite: material.Site?.name || "N/A",
      MaterialTask: material.Task?.name || "N/A",
      CreatedDate: material.created_at.split("T")[0],
    }))
  }), [state.tableData, state.statusOptions]);

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Col className="col-12">
        <Card>
          <CardBody>
            <div className="text-right mb-3">
              <Row className="d-flex justify-content-end">
                <Col className="col-auto" style={{ padding: '0px' }}>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                    <TableFilter
                      entries={state.entriesPerPage}
                      searchTerm={state.searchTerm}
                      handleEntriesChange={handleEntriesChange}
                      handleSearchChange={handleSearchChange}
                      onSiteChange={handleSiteChange}
                    />
                    <Dropdown
                      isOpen={state.statusDropdownOpen}
                      toggle={toggleStatusDropdown}
                      className="mb-2"
                    >
                      <DropdownToggle caret color="secondary">
                        {state.statusFilter
                          ? `${state.statusFilter.charAt(0).toUpperCase() + state.statusFilter.slice(1)}`
                          : "All status"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => handleStatusFilterChange("")}>
                          All Status
                        </DropdownItem>
                        {["Pending", "Approved", "Rejected"].map(status => (
                          <DropdownItem
                            key={status}
                            onClick={() => handleStatusFilterChange(status)}
                            active={state.statusFilter === status}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </div>
            <TableComponent
              data={data}
              currentPage={state.currentPage}
              totalItems={state.totalItems}
              entriesPerPage={state.entriesPerPage}
              totalPages={state.totalPages}
              onPageChange={handlePageChange}
            />
          </CardBody>
        </Card>
      </Col>

      <ConfirmModal
        isOpen={state.statusToggleModal.isOpen}
        toggle={() => dispatch({ type: 'CLOSE_STATUS_TOGGLE_MODAL' })}
        title="Confirm Status Change"
        message={state.statusToggleModal.message}
        onCancel={() => dispatch({ type: 'CLOSE_STATUS_TOGGLE_MODAL' })}
        onConfirm={() => dispatch({ type: 'CLOSE_STATUS_TOGGLE_MODAL' })}
        confirmText="Confirm"
        confirmColor={state.statusToggleModal.currentStatus === 'Approved' ? 'success' : 'danger'}
        execution={handleStatusToggle}
      />

      <div className="notification-container">
        {state.notification.visible && (
          <Alert
            color={state.notification.type}
            isOpen={state.notification.visible}
            toggle={() => dispatch({ type: 'HIDE_NOTIFICATION' })}
          >
            {state.notification.message}
          </Alert>
        )}
      </div>
    </>
  );
};

export default MaterialList;
