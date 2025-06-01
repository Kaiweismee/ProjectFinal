<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>

<%
// 取得網址參數 id
    String productId = request.getParameter("id");
    if (productId == null || productId.trim().isEmpty()) {
        out.println("未指定產品ID");
        return;
    }

    // 資料庫連線設定
    String jdbcUrl = "jdbc:mysql://localhost:3306/FinalEndFront?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Taipei";
    String jdbcUser = "root";
    String jdbcPass = "Wayne0331";

    String productName = "";
    String productDesc = "";
    double productPrice = 0.0;
    String productImage = "";
    String productTeam = "";

    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;

    int productStock = 0;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPass);

        String sql = "SELECT name, description, price, image_url, team, stock FROM products WHERE product_id = ?";
        stmt = conn.prepareStatement(sql);
        stmt.setString(1, productId);
        rs = stmt.executeQuery();

        if (rs.next()) {
            productName = rs.getString("name");
            productDesc = rs.getString("description");
            productPrice = rs.getDouble("price");
            productImage = rs.getString("image_url");
            productTeam = rs.getString("team");
            productStock = rs.getInt("stock");  // 讀取庫存
        } else {
            out.println("找不到此產品");
            return;
        }
    } catch (Exception e) {
        out.println("資料庫錯誤：" + e.getMessage());
        return;
    } finally {
        if (rs != null) try { rs.close(); } catch (Exception e) {}
        if (stmt != null) try { stmt.close(); } catch (Exception e) {}
        if (conn != null) try { conn.close(); } catch (Exception e) {}
    }
%>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><%= productName %> - 商場頁面</title>
    <link rel="stylesheet" href="../../../assets/css/product_style.css" />
</head>
<body>
<header class="header">
    <!-- 大標題改為圖片 -->
    <a href="../../../index.html"><img src="../../../assets/images/title-image.svg" alt="中職商品" class="title-image" /></a>

    <!-- 導航列 -->
    <nav class="navbar">
        <a href="../../aboutus.html" class="about-link">關於我們</a>
        <ul class="nav-list">
            <li class="dropdown"><a href="../../../pages/sectionHTML/brothers_section.html">中信兄弟系列</a></li>
            <li class="dropdown"><a href="../../../pages/sectionHTML/rakuten_section.html">樂天桃猿系列</a></li>
            <li class="dropdown"><a href="../../../pages/sectionHTML/lion_section.html">統一獅系列</a></li>
            <li class="dropdown"><a href="../../../pages/sectionHTML/fuben_section.html">富邦悍將系列</a></li>
            <li class="dropdown"><a href="../../../pages/sectionHTML/dragon_section.html">味全龍系列</a></li>
            <li class="dropdown"><a href="../../../pages/sectionHTML/wings_section.html">台鋼雄鷹系列</a></li>
        </ul>
        <div class="nav-icons">
            <a href="../../member.html" class="icon">會員登入</a>
            <a href="../../memberdata.html" class="icon">會員資料</a>
            <a href="../../car.html" class="icon">購物車</a>
        </div>
    </nav>
</header>

<main>
<section>
    <h2>商品展示</h2>
    <div class="product-display">
        <div>
            <img src="<%= productImage %>" alt="產品圖片" />
            <p><%= productName %></p>
        </div>
        <div>
            <h3>產品介紹</h3>
            <p><%= productDesc %></p>

            <!-- 尺寸選擇 -->
            <label for="size">選擇尺寸：</label>
            <select id="size" class="size-select">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>

            <!-- 價額顯示 -->
            <p>價額：<span id="price" class="price"><%= productPrice %></span> 元</p>

            <p class="stock-info">庫存數量：<span class="stock-number"><%= productStock %></span> 件</p>

            <!-- 數量選取 -->
            <label for="quantity">數量：</label>
            <input type="number" id="quantity" class="quantity-input" value="1" min="1" />

            <!-- 加入購物車按鈕 -->
            <button id="add-to-cart-btn" class="add-to-cart-btn">加入購物車</button>
            <p id="cart-status" class="cart-status" style="display: none; color: green;">已加入購物車</p>
        </div>
    </div>
</section>

<!-- 其餘部分你可依需求加入 -->

</main>

<footer class="footer">
    <div class="footer-container">
        <!-- 顧客回饋 -->
        <div class="feedback-section">
            <h3>顧客回饋</h3>
            <form id="feedbackForm" action="#" method="POST">
                <textarea name="feedback" rows="4" placeholder="請留下您的建議或意見"></textarea>
                <button type="submit">提交回饋</button>
            </form>
            <p id="feedbackMessage" style="display: none; color: #4CAF50; margin-top: 10px;">
                感謝您的回饋！
            </p>
        </div>

        <!-- 聯絡方式 -->
        <div class="contact-section">
            <h3>聯絡方式</h3>
            <p>地址：中原資管樓</p>
            <p>電話：123 456 789</p>
            <p>電子郵件：cyim@gmail.com</p>
        </div>
    </div>
</footer>

<script src="../../../assets/js/feedback.js"></script>
<script src="../../../assets/js/star.js"></script>
<script src="../../../assets/js/brother/product_brother1.js"></script>
<input type="hidden" id="productId" value="<%= productId %>">

<script>
document.getElementById("add-to-cart-btn").addEventListener("click", function () {
    const productId = document.getElementById("productId").value;
    const size = document.getElementById("size").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!productId) {
        alert("產品ID不存在！");
        return;
    }

    if (quantity <= 0 || isNaN(quantity)) {
        alert("請輸入正確的購買數量！");
        return;
    }

    fetch("../../../jsp/add_to_cart.jsp", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "productId=" + encodeURIComponent(productId) +
          "&size=" + encodeURIComponent(size) +
          "&quantity=" + encodeURIComponent(quantity)
})


    .then(response => response.text())
    .then(data => {
        if (data.trim() === "success") {
            document.getElementById("cart-status").style.display = "block";
        } else {
            alert("加入購物車失敗：" + data);
        }
    })
    .catch(error => {
        console.error("錯誤：", error);
        alert("發生錯誤，請稍後再試。");
    });
});
</script>

</body>
</html>
