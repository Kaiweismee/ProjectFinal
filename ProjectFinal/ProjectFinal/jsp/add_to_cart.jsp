<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>

<%
request.setCharacterEncoding("UTF-8");

String productId = request.getParameter("productId");
String size = request.getParameter("size");
String quantityStr = request.getParameter("quantity");

// 參數檢查
if (productId == null || productId.trim().isEmpty() ||
    size == null || size.trim().isEmpty() ||
    quantityStr == null || quantityStr.trim().isEmpty()) {
    out.print("請填寫所有欄位");
    return;
}

int quantity = 0;
try {
    quantity = Integer.parseInt(quantityStr);
    if (quantity <= 0) {
        out.print("數量必須大於0");
        return;
    }
} catch (NumberFormatException e) {
    out.print("數量格式錯誤");
    return;
}

String jdbcUrl = "jdbc:mysql://localhost:3306/FinalEndFront?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Taipei";
String jdbcUser = "root";
String jdbcPass = "Wayne0331";

Connection conn = null;
PreparedStatement checkStockStmt = null;
PreparedStatement updateStockStmt = null;
PreparedStatement insertCartStmt = null;

try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    conn = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPass);
    conn.setAutoCommit(false);

    // 檢查庫存
    String checkStockSql = "SELECT stock FROM products WHERE product_id = ?";
    checkStockStmt = conn.prepareStatement(checkStockSql);
    checkStockStmt.setString(1, productId);
    ResultSet rs = checkStockStmt.executeQuery();

    if (!rs.next()) {
        out.print("找不到商品");
        return;
    }
    int stock = rs.getInt("stock");
    if (stock < quantity) {
        out.print("庫存不足");
        return;
    }
    rs.close();

    // 更新庫存
    String updateStockSql = "UPDATE products SET stock = stock - ? WHERE product_id = ?";
    updateStockStmt = conn.prepareStatement(updateStockSql);
    updateStockStmt.setInt(1, quantity);
    updateStockStmt.setString(2, productId);
    int updated = updateStockStmt.executeUpdate();
    if (updated == 0) {
        out.print("更新庫存失敗");
        conn.rollback();
        return;
    }

    // 新增購物車
    String insertCartSql = "INSERT INTO cart (product_id, size, quantity) VALUES (?, ?, ?)";
    insertCartStmt = conn.prepareStatement(insertCartSql);
    insertCartStmt.setString(1, productId);
    insertCartStmt.setString(2, size);
    insertCartStmt.setInt(3, quantity);
    insertCartStmt.executeUpdate();

    conn.commit();
    out.print("success");

} catch (Exception e) {
    if (conn != null) {
        try {
            conn.rollback();
        } catch (SQLException ex) {
            // 忽略 rollback 失敗
        }
    }
    out.print("錯誤：" + e.getMessage());
} finally {
    if (checkStockStmt != null) try { checkStockStmt.close(); } catch (Exception e) {}
    if (updateStockStmt != null) try { updateStockStmt.close(); } catch (Exception e) {}
    if (insertCartStmt != null) try { insertCartStmt.close(); } catch (Exception e) {}
    if (conn != null) try { conn.close(); } catch (Exception e) {}
}
%>
