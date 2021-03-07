import os
import random
import asyncio
import aiofiles
import aiohttp

# Async with python was new to me. Based the code off of:
# https://www.terriblecode.com/blog/asynchronous-http-requests-in-python/

# Get current dir path and image path
dir_path = os.path.dirname(os.path.realpath(__file__))
dir_images = f"{dir_path}/images"

# If image dir doesn't exists create it
if not os.path.exists(dir_images):
    os.mkdir(dir_images)

cat_image_num = 120


def get_random_dimensions():
    dimensions = {"width": 0, "height": 0}
    dimensions["width"] = random.randint(100, 1000)
    dimensions["height"] = random.randint(100, 1000)
    return dimensions


async def get_cat_image(image_num):
    dimensions = get_random_dimensions()
    url = f"https://placekitten.com/{dimensions['width']}/{dimensions['height']}"
    attempts = 0
    while attempts < 2:
        try:
            # Get cat image from url
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    data = await response.read()

                    # Create and add cat image to image dir
                    img = await aiofiles.open(
                        f"{dir_images}/cat-image-{image_num}.jpg", "wb"
                    )
                    await img.write(data)
                    await img.close()
                    break
        except aiohttp.ClientConnectionError:
            attempts += 1
            print(
                f"🚨 There was error loading cat image {image_num}. Attempt #{attempts} 🚨"
            )


loop = asyncio.get_event_loop()
loop.run_until_complete(
    asyncio.gather(*(get_cat_image((i + 1)) for i in range(0, (cat_image_num))))
)
