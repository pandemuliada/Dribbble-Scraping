const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

axios.get('https://dribbble.com/pandemuliada').then(response => {
  if (response.status == 200) {
    const html = response.data
    const $ = cheerio.load(html)

    let dribbbleShots = []

    $('.floating-sidebar-content ol.dribbbles.group li.group').each(function(i, elem) {
      dribbbleShots[i] = {
        title: $(this).find('.dribbble > .dribbble-shot > .shot-display-options > .dribbble-shot-title-date > .shot-title').text().trim(),
        created_at: $(this).find('.dribbble > .dribbble-shot > .shot-display-options > .dribbble-shot-title-date > .timestamp').text().trim(),
        shot_url: 'https://dribbble.com' + $(this).find('.dribbble > .dribbble-shot > .dribbble-img > a.dribbble-link').attr('href'),
        image: {
          small: $(this).find('.dribbble > .dribbble-shot > .dribbble-img > a.dribbble-link > picture source').eq(1).attr('srcset'),
          large: $(this).find('.dribbble > .dribbble-shot > .dribbble-img > a.dribbble-link > picture source').eq(0).attr('srcset')
        },
        total_likes: $(this).find('.dribbble > .dribbble-shot > .shot-display-options > ul.tools.group > li.fav > span').text().trim(),
        total_views: $(this).find('.dribbble > .dribbble-shot > .shot-display-options > ul.tools.group > li.views > span').text().trim(),
      }
    })


    fs.writeFile(
      'data/dribbbleShots.json', 
      JSON.stringify(dribbbleShots, null, 2),
      () => console.log('File successfuly written!')  
    )

    console.log(dribbbleShots)
    
  }
}).catch(error => console.log(error))