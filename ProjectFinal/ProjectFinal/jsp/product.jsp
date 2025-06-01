<%@ page import="java.sql.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    String url = "jdbc:mysql://localhost:3306/FinalEndFront?useUnicode=true&characterEncoding=UTF-8";
    String user = "root";
    String password = "Wayne0331";

    Class.forName("com.mysql.cj.jdbc.Driver");
    Connection conn = DriverManager.getConnection(url, user, password);

    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM products WHERE product_id = 1"); // 或用 request.getParameter("id") 接收網址參數
%>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>商品頁面</title>
    <link rel="stylesheet" href="../../../assets/css/product_style.css">
</head>
<body>
<% if(rs.next()) { %>
    <h2><%= rs.getString("name") %></h2>
    <img src="<%= rs.getString("image_url") %>" alt="產品圖片">
    <p><%= rs.getString("description") %></p>
    <p>價錢：<%= rs.getDouble("price") %> 元</p>
    <p>庫存：<%= rs.getInt("stock") %> 件</p>
<% } else { %>
    <p>找不到該產品</p>
<% } %>
</body>
</html>
<%
    rs.close();
    stmt.close();
    conn.close();
%>
