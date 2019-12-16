const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

axios.get('https://dribbble.com/pandemuliada').then(response => {
  if (response.status == 200) {
    const html = response.data
    const $ = cheerio.load(html)

    let user = {
      name: $('.floating-sidebar.profile-info > .profile-essentials > h1.vcard > a.url').text().trim(),
      avatar_img: {
        small: $('.floating-sidebar.profile-info > .profile-essentials > h1.vcard > a.url > picture > source').eq(1).attr('srcset'),
        large: $('.floating-sidebar.profile-info > .profile-essentials > h1.vcard > a.url > picture > source').eq(0).attr('srcset')
      },
      bio: $('.floating-sidebar.profile-info > .profile-essentials > .bio').text().trim(),
      address: $('.floating-sidebar.profile-info > .profile-essentials > h1.vcard > .location .locality').text().trim(),
    }

    fs.writeFile(
      'data/dribbbleUserProfile.json', 
      JSON.stringify(user, null, 2),
      () => console.log('File successfuly written!')  
    )

    console.log(JSON.stringify(user, null, 2))
    
  }
}).catch(error => console.log(error))