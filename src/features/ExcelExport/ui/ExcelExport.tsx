import { IListingItem } from "@/entities/Listings/model/types";
import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";
import * as XLSX from "xlsx";

interface Props {
  data: IListingItem[];
}

export default function ExcelExport({ data }: Props) {
  const exportToExcel = () => {
    // Подготовка данных
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Генерация файла
    XLSX.writeFile(workbook, "moderation.xlsx");
  };

  return (
    <Button size="large" onClick={exportToExcel} icon={<FileExcelOutlined />}>
      Выгрузить в Excel
    </Button>
  );
}
