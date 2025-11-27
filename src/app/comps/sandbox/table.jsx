"use client";

import { useMemo, useCallback, useState } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, Pagination, Chip, Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import { IMG_URL, CURRENCY } from "../../local";
import { FaEye, FaTrash, FaEyeSlash, FaCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useI18n } from "../../lib/i18n";
import { statusOptions } from "./data";

// Initial visible columns
const INITIAL_VISIBLE_COLUMNS = [
  "name", "createdAt", "cat", "name_en", "section", "icon", "img", "color",
  "scate", "colore", "cate", "colorCode", "size", "city", "status", "pstatus",
  "email", "refid", "refida", "date", "phone", "feat", "delivery_type", "total",
  "payment_type", "payment_status", "name_ar", "description_ar", "code", "price",
  "images", "qty", "colorname", "sizeo", "imgsingle", "topsec",
];

/**
 * Modern, reusable table component for admin pages
 * Supports sorting, filtering, pagination, and custom actions
 */
export default function ModernTable(props) {
  const { t } = useI18n();

  // State
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({ column: "id", direction: "descending" });
  const [page, setPage] = useState(1);

  // Memoized values
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return props.columns;
    return props.columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, props.columns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...(props.data || [])];

    if (hasSearchFilter && props.search) {
      filteredData = filteredData.filter((item) =>
        item[props.search]?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredData = filteredData.filter((item) =>
        Array.from(statusFilter).includes(item.status)
      );
    }

    return filteredData;
  }, [props.data, filterValue, statusFilter, hasSearchFilter, props.search]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Render cell content with modern design
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "images":
        return (
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm border border-gray-200">
            {item.images && item.images[0] ? (
              <Image
                src={item.images[0].url?.startsWith('http') ? item.images[0].url : `${IMG_URL}${item.images[0].url}`}
                alt={item.name_ar || "Product"}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            )}
          </div>
        );

      case "id":
        return (
          <div className="flex items-center">
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded-md text-gray-600">
              #{cellValue}
            </span>
          </div>
        );

      case "name_ar":
        return (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">{cellValue}</span>
            {item.name_en && (
              <span className="text-xs text-gray-400 mt-0.5">{item.name_en}</span>
            )}
          </div>
        );

      case "code":
        return (
          <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium">
            {cellValue}
          </span>
        );

      case "varients":
        return (
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="text-sm font-bold text-gray-800">
              {item.varients && item.varients[0] ? `${item.varients[0].price}` : 'N/A'}
            </span>
            <span className="text-xs text-gray-500">{CURRENCY}</span>
          </div>
        );

      case "status":
        if (typeof cellValue === 'boolean') {
          return (
            <Chip
              className="capitalize font-medium"
              color={cellValue ? "success" : "default"}
              size="sm"
              variant="flat"
              startContent={
                cellValue ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                )
              }
            >
              {cellValue ? t('statusAvailable') : t('statusUnavailable')}
            </Chip>
          );
        }
        return (
          <Chip
            className="capitalize font-medium"
            color={cellValue === "delivered" || cellValue?.includes("تم") ? "success" : 
                   cellValue === "pending" || cellValue?.includes("قيد") ? "warning" : 
                   cellValue === "confirmed" || cellValue?.includes("مؤكد") ? "primary" : "default"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );

      case "payment_status":
        return (
          <Chip
            className="capitalize font-medium"
            color={cellValue === "paid" || cellValue?.includes("مدفوع") ? "success" : "warning"}
            size="sm"
            variant="flat"
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
            }
          >
            {cellValue}
          </Chip>
        );

      case "date":
        if (cellValue) {
          const date = new Date(cellValue * 1000);
          return (
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 text-gray-400">
                <path fillRule="evenodd" d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7Z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">{date.toLocaleDateString('ar-DZ')}</span>
            </div>
          );
        }
        return <span className="text-gray-400">-</span>;

      case "total":
        return (
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-800">{cellValue}</span>
            <span className="text-xs text-gray-500">{CURRENCY}</span>
          </div>
        );

      case "refida":
        return (
          <div className="flex gap-1.5">
            <Tooltip content="عرض التفاصيل" placement="top">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 min-w-8 h-8"
                onClick={() => props.delorder && props.delorder(item)}
              >
                <FaEye className="text-sm" />
              </Button>
            </Tooltip>
          </div>
        );

      case "createdAt":
        return (
          <div className="flex gap-1.5 flex-wrap">
            {props.duplicateProduct && (
              <Tooltip content="نسخ المنتج" placement="top">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="bg-purple-50 text-purple-600 hover:bg-purple-100 min-w-8 h-8"
                  onClick={() => props.duplicateProduct(item)}
                >
                  <FaCopy className="text-sm" />
                </Button>
              </Tooltip>
            )}
            <Tooltip content="تعديل" placement="top">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 min-w-8 h-8"
                onClick={() => props.delorder && props.delorder(item)}
              >
                <FaEdit className="text-sm" />
              </Button>
            </Tooltip>
            {props.statusChange && (
              <Tooltip content={item.status ? "إخفاء المنتج" : "إظهار المنتج"} placement="top">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className={item.status ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}
                  onClick={() => props.statusChange(!item.status, item.id)}
                >
                  {item.status ? <FaEye className="text-sm" /> : <FaEyeSlash className="text-sm" />}
                </Button>
              </Tooltip>
            )}
            {props.deleteProduct && (
              <Tooltip content="حذف" placement="top" color="danger">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="bg-red-50 text-red-600 hover:bg-red-100 min-w-8 h-8"
                  onClick={() => props.deleteProduct(item.id)}
                >
                  <FaTrash className="text-sm" />
                </Button>
              </Tooltip>
            )}
          </div>
        );

      default:
        return <span className="text-sm text-gray-700">{cellValue}</span>;
    }
  }, [props, t]);

  // Callbacks
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // Top content with modern design
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[400px]"
            placeholder={t('search')}
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{
              input: "text-sm",
              inputWrapper: "bg-gray-50 border-gray-200 hover:bg-gray-100 group-data-[focus=true]:bg-white",
            }}
          />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
              <path fillRule="evenodd" d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{filteredItems.length}</span>
            <span className="text-gray-500">{t('results')}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{t('rowsPerPage')}:</span>
            <select
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-moon-200 focus:border-transparent cursor-pointer hover:bg-gray-100 transition-colors"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="text-xs text-gray-500">
            {selectedKeys === "all"
              ? t('allItemsSelected')
              : selectedKeys.size > 0 && `${selectedKeys.size} ${t('of')} ${filteredItems.length} ${t('selected')}`}
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, filteredItems.length, onRowsPerPageChange, rowsPerPage, onClear, t, selectedKeys]);

  // Bottom content with modern design
  const bottomContent = useMemo(() => {
    return (
      <div className="py-4 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600 order-2 sm:order-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-.765.653-.765 1.209v.07a.75.75 0 0 0 1.5 0v-.07c0-.1.057-.19.142-.232A2.5 2.5 0 1 0 6.25 5.25a.75.75 0 0 0 1.5 0 1 1 0 0 1 1.543-.84Z" clipRule="evenodd" />
          </svg>
          <span>
            {t('page')} <span className="font-semibold">{page}</span> {t('of')} <span className="font-semibold">{pages || 1}</span>
          </span>
        </div>
        
        <div className="order-1 sm:order-2">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages || 1}
            onChange={setPage}
            classNames={{
              wrapper: "gap-1",
              item: "w-8 h-8 text-sm rounded-lg",
              cursor: "bg-gradient-to-r from-moon-200 to-moon-300 shadow-sm",
            }}
          />
        </div>

        <div className="flex gap-2 order-3">
          <Button 
            isDisabled={page === 1} 
            size="sm" 
            variant="flat"
            className="bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
            onPress={onPreviousPage}
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
              </svg>
            }
          >
            <span className="hidden sm:inline">{t('previous')}</span>
          </Button>
          <Button 
            isDisabled={page === pages} 
            size="sm" 
            variant="flat"
            className="bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
            onPress={onNextPage}
            endContent={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            }
          >
            <span className="hidden sm:inline">{t('next')}</span>
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage, t]);

  return (
    <div className="w-full">
      <Table
        aria-label="Modern admin table with enhanced design"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[600px] shadow-sm rounded-xl border border-gray-100",
          th: "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold text-xs uppercase tracking-wider",
          td: "py-4",
          tr: "hover:bg-gray-50/50 transition-colors",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" || column.uid === "createdAt" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              <div className="flex items-center gap-2">
                {column.name}
                {column.sortable && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3 opacity-50">
                    <path fillRule="evenodd" d="M13.78 10.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l.97.97V5.75a.75.75 0 0 1 1.5 0v5.69l.97-.97a.75.75 0 0 1 1.06 0ZM2.22 5.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V4.56l-.97.97a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          emptyContent={
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <p className="text-lg font-medium">{t('noData')}</p>
              <p className="text-sm mt-1">لا توجد بيانات لعرضها</p>
            </div>
          } 
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id} className="border-b border-gray-100 last:border-0">
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
