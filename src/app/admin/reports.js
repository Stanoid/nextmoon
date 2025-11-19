"use client";

import React, { useEffect, useState } from "react";
import { API_URL, CURRENCY } from "../local";
import { useSelector } from "react-redux";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { FaFileExport, FaChartLine, FaBoxes, FaShoppingCart } from "react-icons/fa";
import MiniMoonLoader from "../comps/MiniMoonLoader";

function Reports(props) {
  const udata = useSelector((state) => state.root.auth.data && state.root.auth.data);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    // Inventory Stats
    totalProducts: 0,
    totalVariants: 0,
    lowStock: 0,
    outOfStock: 0,
    inventoryValue: 0,
    // Orders Stats
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  });
  
  const [analytics, setAnalytics] = useState({
    topProducts: [],
    topCities: [],
    paymentMethods: [],
    deliveryTypes: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    props.setLod(true);

    try {
      await Promise.all([fetchProducts(), fetchOrders()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
      props.setLod(false);
    }
  };

  const fetchProducts = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + udata.data.jwt,
      },
    };

    return fetch(`${API_URL}products?func=getAllProductsAdmin`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        calculateInventoryStats(data);
      });
  };

  const fetchOrders = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + udata.data.jwt,
      },
    };

    return fetch(`${API_URL}orders?func=getAdminOrders`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const ordersArray = Array.isArray(data) ? data : [];
        setOrders(ordersArray);
        calculateOrderStats(ordersArray);
      });
  };

  const calculateInventoryStats = (productsData) => {
    let totalProducts = productsData.length;
    let totalVariants = 0;
    let lowStock = 0;
    let outOfStock = 0;
    let inventoryValue = 0;

    productsData.forEach((product) => {
      if (product.varients && product.varients.length > 0) {
        product.varients.forEach((variant) => {
          totalVariants++;
          const stock = variant.stock || 0;
          const price = variant.price || 0;

          if (stock === 0) outOfStock++;
          else if (stock < 10) lowStock++;

          inventoryValue += stock * price;
        });
      }
    });

    setStats((prev) => ({
      ...prev,
      totalProducts,
      totalVariants,
      lowStock,
      outOfStock,
      inventoryValue,
    }));
  };

  const calculateOrderStats = (ordersData) => {
    let totalOrders = ordersData.length;
    let pendingOrders = 0;
    let confirmedOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;
    let totalRevenue = 0;

    ordersData.forEach((order) => {
      const status = order.status?.toLowerCase() || "";
      const total = parseFloat(order.total) || 0;

      if (status.includes("pending") || status.includes("قيد")) pendingOrders++;
      else if (status.includes("confirmed") || status.includes("مؤكد")) confirmedOrders++;
      else if (status.includes("delivered") || status.includes("تم")) deliveredOrders++;
      else if (status.includes("cancelled") || status.includes("ملغي")) cancelledOrders++;

      if (status.includes("delivered") || status.includes("تم")) {
        totalRevenue += total;
      }
    });

    const averageOrderValue = totalOrders > 0 ? totalRevenue / deliveredOrders : 0;

    setStats((prev) => ({
      ...prev,
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      averageOrderValue,
    }));
    
    // Calculate detailed analytics
    calculateAnalytics(ordersData);
  };

  const calculateAnalytics = (ordersData) => {
    console.log("=== Starting Analytics Calculation ===");
    console.log("Total orders:", ordersData.length);
    
    // Top Products Analysis
    const productSales = {};
    const citySales = {};
    const paymentMethodCount = {};
    const deliveryTypeCount = {};

    ordersData.forEach((order, index) => {
      // Debug first order structure
      if (index === 0) {
        console.log("Sample order structure:", {
          id: order.id,
          status: order.status,
          city: order.city,
          wilaya: order.wilaya,
          payment_type: order.payment_type,
          delivery_type: order.delivery_type,
          items: order.items,
          products: order.products,
          hasItems: !!order.items,
          itemsType: typeof order.items,
          itemsLength: Array.isArray(order.items) ? order.items.length : 'not array'
        });
      }
      
      const status = order.status?.toLowerCase() || "";
      const isDelivered = status.includes("delivered") || status.includes("تم");
      
      // Product sales analysis - try multiple data structures
      if (isDelivered) {
        // Try order.items first
        let items = order.items || order.products || order.order_items || [];
        
        // If items is a string, try to parse it
        if (typeof items === 'string') {
          try {
            items = JSON.parse(items);
          } catch (e) {
            console.log("Failed to parse items string:", e);
            items = [];
          }
        }

        if (Array.isArray(items) && items.length > 0) {
          items.forEach((item) => {
            // Try different field names for product name
            const productKey = item.product_name || item.name || item.title || 
                              item.name_ar || item.product?.name_ar || 
                              item.product?.name || "منتج غير معروف";
            
            if (!productSales[productKey]) {
              productSales[productKey] = {
                name: productKey,
                quantity: 0,
                revenue: 0,
                orders: 0
              };
            }
            
            const quantity = parseInt(item.quantity || item.qty || 1);
            const price = parseFloat(item.price || item.unit_price || item.total || 0);
            
            productSales[productKey].quantity += quantity;
            productSales[productKey].revenue += price * quantity;
            productSales[productKey].orders += 1;
          });
        }
      }

      // City analysis (all orders) - try multiple field names
      const city = order.city || order.wilaya || order.state || 
                   order.address?.city || order.address?.wilaya || "غير محدد";
      
      if (!citySales[city]) {
        citySales[city] = {
          name: city,
          orders: 0,
          revenue: 0,
          delivered: 0
        };
      }
      citySales[city].orders += 1;
      if (isDelivered) {
        citySales[city].delivered += 1;
        citySales[city].revenue += parseFloat(order.total) || 0;
      }

      // Payment method analysis
      const paymentMethod = order.payment_type || order.paymentType || 
                           order.payment_method || "غير محدد";
      paymentMethodCount[paymentMethod] = (paymentMethodCount[paymentMethod] || 0) + 1;

      // Delivery type analysis
      const deliveryType = order.delivery_type || order.deliveryType || 
                          order.shipping_method || "غير محدد";
      deliveryTypeCount[deliveryType] = (deliveryTypeCount[deliveryType] || 0) + 1;
    });

    // Convert to arrays and sort
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    const topCities = Object.values(citySales)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 10);

    const paymentMethods = Object.entries(paymentMethodCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const deliveryTypes = Object.entries(deliveryTypeCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    console.log("=== Analytics Results ===");
    console.log("Top Products:", topProducts.length, topProducts);
    console.log("Top Cities:", topCities.length, topCities);
    console.log("Payment Methods:", paymentMethods.length, paymentMethods);
    console.log("Delivery Types:", deliveryTypes.length, deliveryTypes);

    setAnalytics({
      topProducts,
      topCities,
      paymentMethods,
      deliveryTypes,
    });
  };

  const exportToCSV = () => {
    let csvContent = "";
    let filename = "";

    if (reportType === "inventory") {
      filename = "inventory_report.csv";
      csvContent = "Product Code,Product Name,Size,Color,Stock,Price,Value\n";
      
      products.forEach((product) => {
        product.varients?.forEach((variant) => {
          const size = variant.sizes?.data?.[0]?.attributes?.name_ar || variant.sizes?.data?.[0]?.name_ar || "";
          const color = variant.colors?.data?.[0]?.attributes?.name_ar || variant.colors?.data?.[0]?.name_ar || "";
          const stock = variant.stock || 0;
          const price = variant.price || 0;
          const value = stock * price;
          
          csvContent += `${product.code},"${product.name_ar}",${size},${color},${stock},${price},${value}\n`;
        });
      });
    } else if (reportType === "orders") {
      filename = "orders_report.csv";
      csvContent = "Order ID,Date,Customer,Phone,Total,Status,Payment Status,Payment Type\n";
      
      orders.forEach((order) => {
        csvContent += `${order.id},"${order.date}","${order.name}",${order.phone},${order.total},"${order.status}","${order.payment_status}","${order.payment_type}"\n`;
      });
    } else {
      filename = "overview_report.csv";
      csvContent = "Metric,Value\n";
      csvContent += `Total Products,${stats.totalProducts}\n`;
      csvContent += `Total Variants,${stats.totalVariants}\n`;
      csvContent += `Low Stock Items,${stats.lowStock}\n`;
      csvContent += `Out of Stock Items,${stats.outOfStock}\n`;
      csvContent += `Inventory Value,${stats.inventoryValue}\n`;
      csvContent += `Total Orders,${stats.totalOrders}\n`;
      csvContent += `Pending Orders,${stats.pendingOrders}\n`;
      csvContent += `Confirmed Orders,${stats.confirmedOrders}\n`;
      csvContent += `Delivered Orders,${stats.deliveredOrders}\n`;
      csvContent += `Cancelled Orders,${stats.cancelledOrders}\n`;
      csvContent += `Total Revenue,${stats.totalRevenue}\n`;
      csvContent += `Average Order Value,${stats.averageOrderValue.toFixed(2)}\n`;
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    props.notifi("success", "تم تصدير التقرير بنجاح");
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    
    const reportTitles = {
      overview: 'نظرة عامة',
      sales: 'تحليل المبيعات',
      cities: 'تحليل المناطق',
      inventory: 'المخزون',
      orders: 'الطلبات'
    };
    
    let htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>تقرير - ${reportTitles[reportType] || 'تقرير'}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            direction: rtl; 
            padding: 0;
            background: #fff;
          }
          
          /* Header with branding */
          .report-header {
            background: linear-gradient(135deg, #e16d64 0%, #f5a89d 100%);
            color: white;
            padding: 30px 40px;
            margin-bottom: 30px;
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .logo-circle {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #e16d64;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .company-info h1 {
            font-size: 28px;
            margin-bottom: 5px;
            font-weight: 600;
          }
          
          .company-info p {
            font-size: 14px;
            opacity: 0.95;
          }
          
          .report-meta {
            text-align: left;
            background: rgba(255,255,255,0.2);
            padding: 15px 20px;
            border-radius: 8px;
          }
          
          .report-meta h2 {
            font-size: 20px;
            margin-bottom: 5px;
          }
          
          .report-meta p {
            font-size: 13px;
            opacity: 0.9;
          }
          
          /* Content area */
          .report-content {
            padding: 0 40px 40px 40px;
          }
          
          h2 { 
            color: #e16d64; 
            margin: 30px 0 20px 0;
            font-size: 22px;
            border-bottom: 2px solid #e16d64;
            padding-bottom: 10px;
          }
          
          h3 {
            color: #666;
            margin: 20px 0 15px 0;
            font-size: 18px;
          }
          
          /* Tables */
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          th, td { 
            border: 1px solid #e0e0e0; 
            padding: 12px; 
            text-align: right; 
          }
          
          th { 
            background: linear-gradient(135deg, #e16d64 0%, #f5a89d 100%);
            color: white;
            font-weight: 600;
            font-size: 14px;
          }
          
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          
          tr:hover {
            background-color: #fff5f4;
          }
          
          /* Stat cards */
          .stat-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 20px; 
            margin: 25px 0; 
          }
          
          .stat-card { 
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border: 2px solid #e16d64;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(225, 109, 100, 0.1);
          }
          
          .stat-label { 
            color: #666; 
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 8px;
          }
          
          .stat-value { 
            font-size: 28px; 
            font-weight: bold; 
            color: #e16d64;
          }
          
          /* Progress bars */
          .progress-bar-container {
            margin: 15px 0;
          }
          
          .progress-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 14px;
          }
          
          .progress-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
          }
          
          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #e16d64 0%, #f5a89d 100%);
            transition: width 0.3s ease;
          }
          
          /* Footer */
          .report-footer {
            margin-top: 50px;
            padding: 20px 40px;
            background: #f8f9fa;
            border-top: 3px solid #e16d64;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          
          /* Print styles */
          @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
            .report-header { 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            th {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .stat-card {
              page-break-inside: avoid;
            }
          }
          
          /* Buttons */
          .button-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 30px 0;
          }
          
          button {
            padding: 12px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .btn-print {
            background: linear-gradient(135deg, #e16d64 0%, #f5a89d 100%);
            color: white;
            box-shadow: 0 4px 6px rgba(225, 109, 100, 0.3);
          }
          
          .btn-print:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(225, 109, 100, 0.4);
          }
          
          .btn-close {
            background: #6c757d;
            color: white;
          }
          
          .btn-close:hover {
            background: #5a6268;
          }
        </style>
      </head>
      <body>
        <!-- Branded Header -->
        <div class="report-header">
          <div class="header-content">
            <div class="logo-section">
              <div class="logo-circle">MM</div>
              <div class="company-info">
                <h1>MiniMoon</h1>
                <p>تقارير الأعمال والإحصائيات</p>
              </div>
            </div>
            <div class="report-meta">
              <h2>${reportTitles[reportType] || 'تقرير'}</h2>
              <p>التاريخ: ${new Date().toLocaleDateString('ar-DZ')}</p>
              <p>الوقت: ${new Date().toLocaleTimeString('ar-DZ')}</p>
            </div>
          </div>
        </div>
        
        <div class="report-content">
    `;

    if (reportType === 'overview') {
      htmlContent += `
        <h2>إحصائيات المخزون</h2>
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-label">إجمالي المنتجات</div>
            <div class="stat-value">${stats.totalProducts}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">إجمالي الخيارات</div>
            <div class="stat-value">${stats.totalVariants}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">مخزون منخفض</div>
            <div class="stat-value">${stats.lowStock}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">نفذ من المخزون</div>
            <div class="stat-value">${stats.outOfStock}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">قيمة المخزون</div>
            <div class="stat-value">${stats.inventoryValue.toLocaleString()} ${CURRENCY}</div>
          </div>
        </div>

        <h2>إحصائيات الطلبات</h2>
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-label">إجمالي الطلبات</div>
            <div class="stat-value">${stats.totalOrders}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">قيد الانتظار</div>
            <div class="stat-value">${stats.pendingOrders}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">مؤكدة</div>
            <div class="stat-value">${stats.confirmedOrders}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">تم التوصيل</div>
            <div class="stat-value">${stats.deliveredOrders}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">ملغية</div>
            <div class="stat-value">${stats.cancelledOrders}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">إجمالي الإيرادات</div>
            <div class="stat-value">${stats.totalRevenue.toLocaleString()} ${CURRENCY}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">متوسط قيمة الطلب</div>
            <div class="stat-value">${stats.averageOrderValue.toLocaleString()} ${CURRENCY}</div>
          </div>
        </div>
      `;
    } else if (reportType === 'inventory') {
      htmlContent += `
        <table>
          <thead>
            <tr>
              <th>كود المنتج</th>
              <th>اسم المنتج</th>
              <th>المقاس</th>
              <th>اللون</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>القيمة</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      products.forEach((product) => {
        product.varients?.forEach((variant) => {
          const size = variant.sizes?.data?.[0]?.attributes?.name_ar || variant.sizes?.data?.[0]?.name_ar || "-";
          const color = variant.colors?.data?.[0]?.attributes?.name_ar || variant.colors?.data?.[0]?.name_ar || "-";
          const stock = variant.stock || 0;
          const price = variant.price || 0;
          const value = stock * price;
          const status = stock === 0 ? "نفذ" : stock < 10 ? "منخفض" : "متوفر";
          
          htmlContent += `
            <tr>
              <td>${product.code}</td>
              <td>${product.name_ar}</td>
              <td>${size}</td>
              <td>${color}</td>
              <td>${stock}</td>
              <td>${price} ${CURRENCY}</td>
              <td>${value.toLocaleString()} ${CURRENCY}</td>
              <td>${status}</td>
            </tr>
          `;
        });
      });
      
      htmlContent += `
          </tbody>
        </table>
      `;
    } else if (reportType === 'sales') {
      // Sales Analysis Report
      htmlContent += `
        <h2>أكثر المنتجات مبيعاً</h2>
        <table>
          <thead>
            <tr>
              <th>الترتيب</th>
              <th>اسم المنتج</th>
              <th>الكمية المباعة</th>
              <th>عدد الطلبات</th>
              <th>الإيرادات</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      analytics.topProducts.forEach((product, index) => {
        htmlContent += `
          <tr>
            <td><strong>#${index + 1}</strong></td>
            <td>${product.name}</td>
            <td><strong>${product.quantity}</strong></td>
            <td>${product.orders}</td>
            <td><strong>${product.revenue.toLocaleString()} ${CURRENCY}</strong></td>
          </tr>
        `;
      });
      
      htmlContent += `
          </tbody>
        </table>
        
        <h3>طرق الدفع</h3>
      `;
      
      analytics.paymentMethods.forEach((method) => {
        const percentage = ((method.count / stats.totalOrders) * 100).toFixed(1);
        htmlContent += `
          <div class="progress-bar-container">
            <div class="progress-info">
              <span><strong>${method.name}</strong></span>
              <span>${method.count} (${percentage}%)</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
          </div>
        `;
      });
      
      htmlContent += `
        <h3>طرق التوصيل</h3>
      `;
      
      analytics.deliveryTypes.forEach((type) => {
        const percentage = ((type.count / stats.totalOrders) * 100).toFixed(1);
        htmlContent += `
          <div class="progress-bar-container">
            <div class="progress-info">
              <span><strong>${type.name}</strong></span>
              <span>${type.count} (${percentage}%)</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
          </div>
        `;
      });
      
    } else if (reportType === 'cities') {
      // Cities Analysis Report
      htmlContent += `
        <h2>تحليل المناطق والمدن</h2>
        <table>
          <thead>
            <tr>
              <th>الترتيب</th>
              <th>المدينة/الولاية</th>
              <th>عدد الطلبات</th>
              <th>تم التوصيل</th>
              <th>معدل النجاح</th>
              <th>الإيرادات</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      analytics.topCities.forEach((city, index) => {
        const successRate = ((city.delivered / city.orders) * 100).toFixed(1);
        htmlContent += `
          <tr>
            <td><strong>#${index + 1}</strong></td>
            <td><strong>${city.name}</strong></td>
            <td>${city.orders}</td>
            <td>${city.delivered}</td>
            <td><strong>${successRate}%</strong></td>
            <td><strong>${city.revenue.toLocaleString()} ${CURRENCY}</strong></td>
          </tr>
        `;
      });
      
      htmlContent += `
          </tbody>
        </table>
      `;
      
    } else if (reportType === 'orders') {
      htmlContent += `
        <table>
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>التاريخ</th>
              <th>العميل</th>
              <th>الهاتف</th>
              <th>المجموع</th>
              <th>حالة الطلب</th>
              <th>حالة الدفع</th>
              <th>طريقة الدفع</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      orders.forEach((order) => {
        htmlContent += `
          <tr>
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.name}</td>
            <td>${order.phone}</td>
            <td>${order.total} ${CURRENCY}</td>
            <td>${order.status}</td>
            <td>${order.payment_status}</td>
            <td>${order.payment_type}</td>
          </tr>
        `;
      });
      
      htmlContent += `
          </tbody>
        </table>
      `;
    }

    htmlContent += `
        </div>
        
        <!-- Footer -->
        <div class="report-footer">
          <p><strong>MiniMoon</strong> - نظام إدارة المتجر الإلكتروني</p>
          <p style="margin-top: 5px;">تم إنشاء هذا التقرير تلقائياً بواسطة نظام التقارير</p>
        </div>
        
        <!-- Action Buttons -->
        <div class="no-print button-group">
          <button class="btn-print" onclick="window.print()">
            <span>📄</span> طباعة / حفظ PDF
          </button>
          <button class="btn-close" onclick="window.close()">
            <span>✖</span> إغلاق
          </button>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    props.notifi("success", "تم فتح نافذة الطباعة");
  };

  return (
    <div dir="rtl" className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaChartLine className="text-moon-200" />
            التقارير والإحصائيات
          </h1>
        </div>
        <p className="text-gray-500 text-sm">تقارير شاملة عن المخزون والطلبات</p>
      </div>

      {/* Report Type Selector */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={reportType === "overview" ? "solid" : "bordered"}
            className={reportType === "overview" ? "bg-gradient-to-r from-moon-200 to-moon-300 text-white" : ""}
            onClick={() => setReportType("overview")}
          >
            نظرة عامة
          </Button>
          <Button
            size="sm"
            variant={reportType === "sales" ? "solid" : "bordered"}
            className={reportType === "sales" ? "bg-gradient-to-r from-moon-200 to-moon-300 text-white" : ""}
            onClick={() => setReportType("sales")}
          >
            تحليل المبيعات
          </Button>
          <Button
            size="sm"
            variant={reportType === "cities" ? "solid" : "bordered"}
            className={reportType === "cities" ? "bg-gradient-to-r from-moon-200 to-moon-300 text-white" : ""}
            onClick={() => setReportType("cities")}
          >
            المناطق
          </Button>
          <Button
            size="sm"
            variant={reportType === "inventory" ? "solid" : "bordered"}
            className={reportType === "inventory" ? "bg-gradient-to-r from-moon-200 to-moon-300 text-white" : ""}
            onClick={() => setReportType("inventory")}
          >
            المخزون
          </Button>
          <Button
            size="sm"
            variant={reportType === "orders" ? "solid" : "bordered"}
            className={reportType === "orders" ? "bg-gradient-to-r from-moon-200 to-moon-300 text-white" : ""}
            onClick={() => setReportType("orders")}
          >
            الطلبات
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white"
            startContent={<FaFileExport />}
            onClick={exportToCSV}
          >
            تصدير CSV
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-red-500 to-red-600 text-white"
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            }
            onClick={exportToPDF}
          >
            تصدير PDF
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <MiniMoonLoader size="lg" />
        </div>
      ) : (
        <>
          {/* Overview Report */}
          {reportType === "overview" && (
            <div className="space-y-6">
              {/* Inventory Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBoxes className="text-moon-200" />
                  إحصائيات المخزون
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">إجمالي المنتجات</p>
                    <p className="text-3xl font-bold text-blue-700">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">إجمالي الخيارات</p>
                    <p className="text-3xl font-bold text-purple-700">{stats.totalVariants}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-yellow-600 font-medium">مخزون منخفض</p>
                    <p className="text-3xl font-bold text-yellow-700">{stats.lowStock}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                    <p className="text-sm text-red-600 font-medium">نفذ من المخزون</p>
                    <p className="text-3xl font-bold text-red-700">{stats.outOfStock}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200 sm:col-span-2">
                    <p className="text-sm text-green-600 font-medium">قيمة المخزون الإجمالية</p>
                    <p className="text-3xl font-bold text-green-700">{stats.inventoryValue.toLocaleString()} {CURRENCY}</p>
                  </div>
                </div>
              </div>

              {/* Orders Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaShoppingCart className="text-moon-200" />
                  إحصائيات الطلبات
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">إجمالي الطلبات</p>
                    <p className="text-3xl font-bold text-blue-700">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-yellow-600 font-medium">قيد الانتظار</p>
                    <p className="text-3xl font-bold text-yellow-700">{stats.pendingOrders}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">مؤكدة</p>
                    <p className="text-3xl font-bold text-purple-700">{stats.confirmedOrders}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-green-600 font-medium">تم التوصيل</p>
                    <p className="text-3xl font-bold text-green-700">{stats.deliveredOrders}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                    <p className="text-sm text-red-600 font-medium">ملغية</p>
                    <p className="text-3xl font-bold text-red-700">{stats.cancelledOrders}</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                    <p className="text-sm text-emerald-600 font-medium">إجمالي الإيرادات</p>
                    <p className="text-3xl font-bold text-emerald-700">{stats.totalRevenue.toLocaleString()} {CURRENCY}</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200 sm:col-span-2 lg:col-span-3">
                    <p className="text-sm text-cyan-600 font-medium">متوسط قيمة الطلب</p>
                    <p className="text-3xl font-bold text-cyan-700">{stats.averageOrderValue.toLocaleString()} {CURRENCY}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Detailed Report */}
          {reportType === "inventory" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">كود المنتج</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">اسم المنتج</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">المقاس</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">اللون</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الكمية</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">السعر</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">القيمة</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) =>
                      product.varients?.map((variant, idx) => {
                        const size = variant.sizes?.data?.[0]?.attributes?.name_ar || variant.sizes?.data?.[0]?.name_ar || "-";
                        const color = variant.colors?.data?.[0]?.attributes?.name_ar || variant.colors?.data?.[0]?.name_ar || "-";
                        const stock = variant.stock || 0;
                        const price = variant.price || 0;
                        const value = stock * price;
                        const status = stock === 0 ? "نفذ" : stock < 10 ? "منخفض" : "متوفر";
                        const statusColor = stock === 0 ? "text-red-600" : stock < 10 ? "text-yellow-600" : "text-green-600";

                        return (
                          <tr key={`${product.id}-${idx}`} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-700">{product.code}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{product.name_ar}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{size}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{color}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{stock}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{price} {CURRENCY}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{value.toLocaleString()} {CURRENCY}</td>
                            <td className={`px-4 py-3 text-sm font-semibold ${statusColor}`}>{status}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sales Analysis Report */}
          {reportType === "sales" && (
            <div className="space-y-6">
              {/* Top Selling Products */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-moon-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                  أكثر المنتجات مبيعاً ({analytics.topProducts.length})
                </h2>
                {analytics.topProducts && analytics.topProducts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الترتيب</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">اسم المنتج</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الكمية المباعة</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">عدد الطلبات</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإيرادات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {analytics.topProducts.map((product, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-bold text-gray-900">#{index + 1}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{product.name}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-blue-600">{product.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{product.orders}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-green-600">{product.revenue.toLocaleString()} {CURRENCY}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 mx-auto mb-4 text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p className="text-gray-500 text-lg font-medium mb-2">لا توجد بيانات مبيعات</p>
                    <p className="text-gray-400 text-sm">تأكد من وجود طلبات مكتملة تحتوي على منتجات</p>
                    <p className="text-gray-400 text-xs mt-2">افتح Console للمزيد من التفاصيل (F12)</p>
                  </div>
                )}
              </div>

              {/* Payment & Delivery Methods */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Methods */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">طرق الدفع</h3>
                  <div className="space-y-3">
                    {analytics.paymentMethods.map((method, index) => {
                      const percentage = ((method.count / stats.totalOrders) * 100).toFixed(1);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{method.name}</span>
                              <span className="text-sm text-gray-500">{method.count} ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-moon-200 to-moon-300 h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Types */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">طرق التوصيل</h3>
                  <div className="space-y-3">
                    {analytics.deliveryTypes.map((type, index) => {
                      const percentage = ((type.count / stats.totalOrders) * 100).toFixed(1);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{type.name}</span>
                              <span className="text-sm text-gray-500">{type.count} ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cities Analysis Report */}
          {reportType === "cities" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-moon-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                تحليل المناطق والمدن ({analytics.topCities.length})
              </h2>
              {analytics.topCities && analytics.topCities.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الترتيب</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">المدينة/الولاية</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">عدد الطلبات</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">تم التوصيل</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">معدل النجاح</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإيرادات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {analytics.topCities.map((city, index) => {
                        const successRate = ((city.delivered / city.orders) * 100).toFixed(1);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-bold text-gray-900">#{index + 1}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-700">{city.name}</td>
                            <td className="px-4 py-3 text-sm text-blue-600 font-semibold">{city.orders}</td>
                            <td className="px-4 py-3 text-sm text-green-600">{city.delivered}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`font-semibold ${successRate >= 70 ? 'text-green-600' : successRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {successRate}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-emerald-600">{city.revenue.toLocaleString()} {CURRENCY}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 mx-auto mb-4 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium mb-2">لا توجد بيانات مناطق</p>
                  <p className="text-gray-400 text-sm">تأكد من وجود طلبات تحتوي على معلومات المدينة/الولاية</p>
                  <p className="text-gray-400 text-xs mt-2">افتح Console للمزيد من التفاصيل (F12)</p>
                </div>
              )}
            </div>
          )}

          {/* Orders Detailed Report */}
          {reportType === "orders" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">رقم الطلب</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">التاريخ</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">العميل</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الهاتف</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">المجموع</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">حالة الطلب</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">حالة الدفع</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">طريقة الدفع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.phone}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.total} {CURRENCY}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.status}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.payment_status}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.payment_type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Reports;
