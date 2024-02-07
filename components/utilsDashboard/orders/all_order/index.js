import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { LiaSearchSolid } from "react-icons/lia";
import { ChevronDownIcon } from "./dd";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "./utils";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
const statusColorMap = {
  successful: "success",
  Unsuccessful: "danger",
  Pending: "warning",
};

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    return columns;
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "details":
        return (
          <div className="text-blue-800 cursor-pointer">
            {" "}
            {cellValue} <MdKeyboardDoubleArrowLeft className="inline" />
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {statusOptions.map((status) => {
              if (status.uid === cellValue) {
                return status.name;
              }
            })}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((e) => {
    if (e.target.value) {
      setFilterValue(e.target.value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center">
          <div className="relative">
          <input
            type="text"
            className="outline-none bg-bgcolor text-[#fff] py-[8px] pr-[18px] pl-2 rounded-[10px] placeholder:text-[#fff] placeholder:text-[12px] "
            onChange={(e) => onSearchChange(e)}
            value={filterValue}
            placeholder="جستجو بر اساس نام  گیرنده..."
          />
          <LiaSearchSolid className="absolute top-[12px] text-[#fff] left-[6px]" />
          </div>
          <div className="flex gap-3 mx-6">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex !bg-bgcolor !text-[white] text-[14px]">
                <Button
                  endContent={<ChevronDownIcon className="text-small " />}
                  variant="flat"
                >
                  فیلتر بر اساس وضعیت
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-start items-center px-20">
          <span className="text-colorgray text-[16px]">
            مجموع سفارش ها: <span className="bg-bgcolor text-[#fff] px-3 rounded">{users.length}</span>
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
          className="ltr pr-20"
        />
        <label className="flex items-center text-colorgray text-[16px] pl-20">
          تعداد سطر ها
          <select
            className="bg-transparent outline-none text-[white] !bg-bgcolor text-small mx-2 px-2 rounded-sm"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      className="overflow-x-auto overflow-y-hidden"
      aria-label="سفارش ها"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "min-h-[300px] rtl",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns} className="">
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            className={`bg-bgcolor text-white !rounded-none text-right ${
              column.uid === "id" ? "!rounded-s-md " : ""
            } ${column.uid === "factor" ? "!rounded-e-md " : ""}`}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"سفارشی ندارید"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id} className="!py-16">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
