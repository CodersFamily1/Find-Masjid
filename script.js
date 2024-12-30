// অনেক JSON ফাইল থেকে ডেটা লোড করা
Promise.all([
  fetch('-Rangpur.json'),
  fetch('-Dhaka.json'),
  fetch('-Dinajpur.json'),
  fetch('-Chattagram.json')
])
  .then(responses => {
    return Promise.all(responses.map(response => response.json()));
  })
  .then(data => {
    const combinedData = [].concat(...data); // সব ডেটা একত্রিত করা

    const mosqueList = document.getElementById('mosqueList');
    const searchBar = document.getElementById('searchBar');
    const details = document.getElementById('details');
    const mosqueName = document.getElementById('mosqueName');
    const mosqueLocation = document.getElementById('mosqueLocation');
    const mosqueImam = document.getElementById('mosqueImam');
    const mosqueContact = document.getElementById('mosqueContact');
    const backButton = document.getElementById('backButton');
    const mosqueDtails = document.getElementById('mosqueDtails');
    const mosqueURL = document.getElementById('mosqueURL');
    let mosqueImage = document.getElementById("myImage");
    const noResult = document.getElementById('noResult');

    // ডেটা র‌্যাংকিং অনুযায়ী সাজানো
    function rankResults(searchText, mosque) {
      const lowerSearch = searchText.toLowerCase();
      let score = 0;

      if (mosque.name.toLowerCase().includes(lowerSearch)) score += 3;
      if (mosque.location.toLowerCase().includes(lowerSearch)) score += 2;
      if (mosque.imam.toLowerCase().includes(lowerSearch)) score += 2;
      if (mosque.contact.toLowerCase().includes(lowerSearch)) score += 1;

      return score;
    }

    // মসজিদের নামের তালিকা দেখানোর ফাংশন
    function renderList(filteredData) {
      mosqueList.innerHTML = ''; // আগের ডেটা মুছে ফেলা
      details.style.display = 'none'; // বিস্তারিত তথ্য লুকানো

      if (filteredData.length > 0) {
        noResult.style.display = 'none'; // "কোনো মসজিদ পাওয়া যায়নি!" বার্তা লুকানো
        filteredData.forEach(mosque => {
          // Bangla english বিভক্তি
          const only_loca = mosque.location.split('||');
          const only_name = mosque.name.split('||');

          const listItem = document.createElement('li');
          listItem.classList.add('rahi');
          listItem.textContent = `${only_name[0]} || ${only_loca[0]} `;
          listItem.addEventListener('click', () => {
            showDetails(mosque);
          });
          mosqueList.appendChild(listItem);
        });
      } else {
        noResult.style.display = 'block'; // "কোনো মসজিদ পাওয়া যায়নি!" বার্তা দেখানো
      }
    }

    // বিস্তারিত তথ্য দেখানোর ফাংশন
    function showDetails(mosque) {
      mosqueName.textContent = mosque.name || "নাম পাওয়া যায়নি"; // নাম
      mosqueLocation.textContent = mosque.location || "লোকেশন পাওয়া যায়নি"; // লোকেশন
      mosqueImage.src = mosque.image + ".png" || "default_image.png"; // ইমেজ, যদি না থাকে তবে ডিফল্ট ইমেজ
      mosqueImam.textContent = mosque.imam || "ইমাম পাওয়া যায়নি"; // ইমাম
      mosqueURL.href = mosque.url || "#"; // URL, যদি না থাকে তবে #
      mosqueContact.textContent = mosque.contact || "পাওয়া যায়নি"; // যোগাযোগ
      mosqueDtails.textContent = mosque.details || "বিস্তারিত তথ্য নেই"; // বিস্তারিত তথ্য

      details.style.display = 'block'; // বিস্তারিত তথ্য দেখানো
      mosqueList.innerHTML = ''; // মসজিদের তালিকা লুকানো
    }

    // সার্চ বার ইনপুটের উপর ভিত্তি করে ফিল্টার
    searchBar.addEventListener('input', () => {
      const searchText = searchBar.value.trim().toLowerCase(); // খালি জায়গা বাদ দিন
      if (searchText) {
        const scoredData = combinedData
          .map(mosque => ({
            ...mosque,
            score: rankResults(searchText, mosque),
          }))
          .filter(mosque => mosque.score > 0) // কেবল যেগুলো স্কোর পেয়েছে সেগুলো রাখুন
          .sort((a, b) => b.score - a.score); // স্কোর অনুসারে সাজান (বড় থেকে ছোট)

        renderList(scoredData); // র‌্যাংক করা তালিকা দেখানো
      } else {
        mosqueList.innerHTML = ''; // ইনপুট খালি থাকলে তালিকা ক্লিয়ার করুন
        noResult.style.display = 'none'; // "কোনো মসজিদ পাওয়া যায়নি!" লুকান
      }
    });

    // ফিরে যাওয়ার বোতাম
    backButton.addEventListener('click', () => {
      details.style.display = 'none'; // বিস্তারিত তথ্য লুকানো
      mosqueList.innerHTML = ''; // মসজিদের তালিকা লুকানো
      searchBar.value = ''; // সার্চ বক্স খালি করা
    });
  })
  .catch(error => console.error('ডেটা লোড করার সময় সমস্যা:', error));

// count data
// JSON ফাইলগুলোর লিস্ট
const jsonFiles = ['-Dhaka.json', '-Rangpur.json','-Dinajpur.json','-Chattagram.json'];

// মোট গণনা রাখার জন্য একটি ভ্যারিয়েবল
let totalCount = 0;

// প্রতিটি JSON ফাইল লোড করা
Promise.all(
    jsonFiles.map(file =>
      fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching ${file}`);
        }
        return response.json();
      })
      .then(data => data.length)
    )
  )
  .then(lengths => {
    // সকল ফাইলের মোট সংখ্যা গণনা
    totalCount = lengths.reduce((sum, count) => sum + count, 0);

    // span এর ভিতরে মোট সংখ্যা সেট করা
    document.getElementById('masjid_count').textContent = totalCount;
  })
  .catch(error => console.error('Error loading JSON files:', error));