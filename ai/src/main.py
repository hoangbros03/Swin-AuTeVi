from module1 import search_image, search_product
from module2 import create_prompt, generate_script
from module3 import create_scenes_data, create_movie, generate_video

brand_info="""
Brand mission and value: N/a
Audience: Everyone
Goal: Display the product to everyone
Distribution channels: Facebook
Time: Tet holiday
"""

product="""Bia Hơi Hà Nội - Thùng 24 lon 500ml - Phiên bản Tết
Thông tin sản phẩm
• Dung tích: 500ml/lon
• Nồng độ cồn: 4.1 ± 0.4%
• Thành phần: nước, mạch nha, gạo, đường, hoa Houblon
• HSD: 5 tháng kể từ ngày sản xuất
HABECO - Thương hiệu đồ uống hàng đầu Việt Nam
Những dòng sản phẩm nổi tiếng làm nên thương hiệu Habeco có thể kể đến như Bia hơi Hà Nội, Bia lon Hà Nội, Bia Trúc Bạch, Hanoi Beer Premium… Với bí quyết công nghệ - truyền thống gần 130 năm, hệ thống thiết bị hiện đại, đội ngũ cán bộ công nhân viên lành nghề, các sản phẩm của HABECO đã trở thành niềm tự hào của thương hiệu Việt và được phân phối rộng rãi tới các thị trường nước ngoài như Đài Loan, Hàn Quốc, Anh, Đức, Mỹ,...
Bia Hơi Hà Nội: Một nét văn hoá Hà Nội
Bia Hơi Hà Nội ra đời và phát triển cùng những năm tháng thăng trầm của Thủ Đô Ngàn Năm Văn Hiến. Đổi thay qua từng ngày, những sản phẩm mới của Bia Hơi Hà Nội đã được ra mắt và phổ cập trên thị trường để nét văn hoá này ngày càng đẹp hơn, càng gần gũi với tất cả các thế hệ.
Lưu ý và bảo quản
• Sản phẩm dành cho người trên 18 tuổi
• Không dành cho phụ nữ đang mang thai
• Thưởng thức có trách nhiệm, đã uống đồ uống có cồn thì không lái xe
• Ngon hơn khi uống lạnh (10-15̊C)
• Bảo quản nơi khô ráo, sạch sẽ, thoáng mát, tránh ánh nắng mặt trời (<25̊C). Nếu mở lon phải dùng ngay hoặc bảo quản lạnh nếu muốn dùng lâu"""

short_product = "Bia Hơi Hà Nội - Thùng 24 lon 500ml - Phiên bản Tết"

product_info = search_product(short_product)
content = [product_info['results'][i]['content'] for i in range(5)]

gemini_prompt = create_prompt(short_product, brand_info, content)

script = generate_script(gemini_prompt)

images = search_image(script['keyword'][0])

movie = create_movie(create_scenes_data(script, images))

video = generate_video(movie)

print(video)
