import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToPDF = (data, title = 'Report') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
  
  // Add data
  let yPosition = 50;
  doc.setFontSize(12);
  
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      if (typeof item === 'object') {
        Object.entries(item).forEach(([key, value]) => {
          doc.text(`${key}: ${value}`, 20, yPosition);
          yPosition += 10;
        });
        yPosition += 5; // Extra space between items
      } else {
        doc.text(`${index + 1}. ${item}`, 20, yPosition);
        yPosition += 10;
      }
      
      // Add new page if needed
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
    });
  } else if (typeof data === 'object') {
    Object.entries(data).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, yPosition);
      yPosition += 10;
      
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
    });
  }
  
  // Save the PDF
  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.pdf`);
};

export const exportToExcel = (data, filename = 'report') => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Convert data to worksheet
  let ws;
  
  if (Array.isArray(data)) {
    // If data is an array of objects, create a sheet from JSON
    ws = XLSX.utils.json_to_sheet(data);
  } else if (typeof data === 'object') {
    // If data is a single object, convert to array first
    ws = XLSX.utils.json_to_sheet([data]);
  } else {
    // If data is primitive, create a simple sheet
    ws = XLSX.utils.aoa_to_sheet([['Data'], [data]]);
  }
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  // Add metadata
  wb.Props = {
    Title: filename,
    Subject: 'Darkstore Inventory Report',
    Author: 'Darkstore Management System',
    CreatedDate: new Date()
  };
  
  // Save the file
  XLSX.writeFile(wb, `${filename}_${Date.now()}.xlsx`);
};

export const exportDashboardData = () => {
  const dashboardData = {
    totalProducts: '12,847',
    totalInventoryValue: '₹2,45,67,890',
    averageStockPerStore: '4,283',
    outOfStockAlerts: '23',
    discountsApplied: '1,456',
    lowStockWarnings: '87',
    exportDate: new Date().toISOString(),
    exportType: 'Dashboard Summary'
  };
  
  return dashboardData;
};

export const exportProductsData = (products) => {
  return products.map(product => ({
    ID: product.id,
    Name: product.name,
    SKU: product.sku,
    Category: product.category,
    Quantity: product.quantity,
    Price: product.price,
    'Expiry Date': product.expiryDate,
    Supplier: product.supplier,
    'Quality Score': product.qualityScore,
    Status: product.status,
    'Last Updated': product.lastUpdated
  }));
};

export const exportInventoryData = () => {
  const inventoryData = [
    {
      Metric: 'Total Stock Value',
      Value: '₹2,45,67,890',
      Change: '+5.2%',
      Period: 'vs last month'
    },
    {
      Metric: 'Overstock Items',
      Value: '127',
      Change: '+12.3%',
      Period: 'vs last month'
    },
    {
      Metric: 'Understock Items',
      Value: '43',
      Change: '-8.7%',
      Period: 'vs last month'
    },
    {
      Metric: 'Stock Turnover Rate',
      Value: '2.4x',
      Change: '+0.3',
      Period: 'vs last month'
    }
  ];
  
  return inventoryData;
};

export const exportRegionalData = (location) => {
  const regionalData = {
    'Location Name': location.name,
    'Address': location.address,
    'Capacity Used': `${location.capacity}%`,
    'Current Stock': location.currentStock.toLocaleString(),
    'Max Capacity': location.maxCapacity.toLocaleString(),
    'Staff Count': location.staffCount,
    'Performance Score': `${location.performanceScore}%`,
    'Manager': location.manager,
    'Phone': location.phone,
    'Email': location.email,
    'Operating Hours': location.operatingHours,
    'Status': location.status,
    'Export Date': new Date().toISOString()
  };
  
  // Add category breakdown
  location.categories.forEach((category, index) => {
    regionalData[`Category ${index + 1} - Name`] = category.name;
    regionalData[`Category ${index + 1} - Stock`] = category.stock;
    regionalData[`Category ${index + 1} - Capacity`] = category.capacity;
    regionalData[`Category ${index + 1} - Utilization`] = `${Math.round((category.stock / category.capacity) * 100)}%`;
  });
  
  return regionalData;
};