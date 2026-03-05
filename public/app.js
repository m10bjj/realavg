/* ═══════════════════════════════════════════════════════
   지역 코드 데이터 (법정동코드 앞 5자리)
═══════════════════════════════════════════════════════ */
const REGIONS = {
  '서울특별시': [
    { code:'11110', name:'종로구'   }, { code:'11140', name:'중구'     },
    { code:'11170', name:'용산구'   }, { code:'11200', name:'성동구'   },
    { code:'11215', name:'광진구'   }, { code:'11230', name:'동대문구' },
    { code:'11260', name:'중랑구'   }, { code:'11290', name:'성북구'   },
    { code:'11305', name:'강북구'   }, { code:'11320', name:'도봉구'   },
    { code:'11350', name:'노원구'   }, { code:'11380', name:'은평구'   },
    { code:'11410', name:'서대문구' }, { code:'11440', name:'마포구'   },
    { code:'11470', name:'양천구'   }, { code:'11500', name:'강서구'   },
    { code:'11530', name:'구로구'   }, { code:'11545', name:'금천구'   },
    { code:'11560', name:'영등포구' }, { code:'11590', name:'동작구'   },
    { code:'11620', name:'관악구'   }, { code:'11650', name:'서초구'   },
    { code:'11680', name:'강남구'   }, { code:'11710', name:'송파구'   },
    { code:'11740', name:'강동구'   },
  ],
  '부산광역시': [
    { code:'26110', name:'중구'     }, { code:'26140', name:'서구'     },
    { code:'26170', name:'동구'     }, { code:'26200', name:'영도구'   },
    { code:'26230', name:'부산진구' }, { code:'26260', name:'동래구'   },
    { code:'26290', name:'남구'     }, { code:'26320', name:'북구'     },
    { code:'26350', name:'해운대구' }, { code:'26380', name:'사하구'   },
    { code:'26410', name:'금정구'   }, { code:'26440', name:'강서구'   },
    { code:'26470', name:'연제구'   }, { code:'26500', name:'수영구'   },
    { code:'26530', name:'사상구'   }, { code:'26710', name:'기장군'   },
  ],
  '대구광역시': [
    { code:'27110', name:'중구'   }, { code:'27140', name:'동구'   },
    { code:'27170', name:'서구'   }, { code:'27200', name:'남구'   },
    { code:'27230', name:'북구'   }, { code:'27260', name:'수성구' },
    { code:'27290', name:'달서구' }, { code:'27710', name:'달성군' },
    { code:'27720', name:'군위군' },
  ],
  '인천광역시': [
    { code:'28110', name:'중구'     }, { code:'28140', name:'동구'   },
    { code:'28177', name:'미추홀구' }, { code:'28185', name:'연수구' },
    { code:'28200', name:'남동구'   }, { code:'28237', name:'부평구' },
    { code:'28245', name:'계양구'   }, { code:'28260', name:'서구'   },
    { code:'28710', name:'강화군'   }, { code:'28720', name:'옹진군' },
  ],
  '광주광역시': [
    { code:'29110', name:'동구' }, { code:'29140', name:'서구'   },
    { code:'29155', name:'남구' }, { code:'29170', name:'북구'   },
    { code:'29200', name:'광산구' },
  ],
  '대전광역시': [
    { code:'30110', name:'동구' }, { code:'30140', name:'중구'   },
    { code:'30170', name:'서구' }, { code:'30200', name:'유성구' },
    { code:'30230', name:'대덕구' },
  ],
  '울산광역시': [
    { code:'31110', name:'중구' }, { code:'31140', name:'남구' },
    { code:'31170', name:'동구' }, { code:'31200', name:'북구' },
    { code:'31710', name:'울주군' },
  ],
  '세종특별자치시': [
    { code:'36110', name:'세종특별자치시' },
  ],
  '경기도': [
    { code:'41111', name:'수원시 장안구' }, { code:'41113', name:'수원시 권선구' },
    { code:'41115', name:'수원시 팔달구' }, { code:'41117', name:'수원시 영통구' },
    { code:'41131', name:'성남시 수정구' }, { code:'41133', name:'성남시 중원구' },
    { code:'41135', name:'성남시 분당구' }, { code:'41150', name:'의정부시'      },
    { code:'41171', name:'안양시 만안구' }, { code:'41173', name:'안양시 동안구' },
    { code:'41190', name:'부천시'        }, { code:'41210', name:'광명시'        },
    { code:'41220', name:'평택시'        }, { code:'41250', name:'동두천시'      },
    { code:'41271', name:'안산시 상록구' }, { code:'41273', name:'안산시 단원구' },
    { code:'41281', name:'고양시 덕양구' }, { code:'41285', name:'고양시 일산동구'},
    { code:'41287', name:'고양시 일산서구'}, { code:'41290', name:'과천시'       },
    { code:'41310', name:'구리시'        }, { code:'41360', name:'남양주시'      },
    { code:'41370', name:'오산시'        }, { code:'41390', name:'시흥시'        },
    { code:'41410', name:'군포시'        }, { code:'41430', name:'의왕시'        },
    { code:'41450', name:'하남시'        }, { code:'41461', name:'용인시 처인구' },
    { code:'41463', name:'용인시 기흥구' }, { code:'41465', name:'용인시 수지구' },
    { code:'41480', name:'파주시'        }, { code:'41500', name:'이천시'        },
    { code:'41550', name:'안성시'        }, { code:'41570', name:'김포시'        },
    { code:'41590', name:'화성시'        }, { code:'41610', name:'광주시'        },
    { code:'41630', name:'양주시'        }, { code:'41650', name:'포천시'        },
    { code:'41670', name:'여주시'        }, { code:'41800', name:'연천군'        },
    { code:'41820', name:'가평군'        }, { code:'41830', name:'양평군'        },
  ],
  '강원특별자치도': [
    { code:'51110', name:'춘천시' }, { code:'51130', name:'원주시' },
    { code:'51150', name:'강릉시' }, { code:'51170', name:'동해시' },
    { code:'51190', name:'태백시' }, { code:'51210', name:'속초시' },
    { code:'51230', name:'삼척시' }, { code:'51720', name:'홍천군' },
    { code:'51730', name:'횡성군' }, { code:'51750', name:'영월군' },
    { code:'51760', name:'평창군' }, { code:'51770', name:'정선군' },
    { code:'51780', name:'철원군' }, { code:'51790', name:'화천군' },
    { code:'51800', name:'양구군' }, { code:'51810', name:'인제군' },
    { code:'51820', name:'고성군' }, { code:'51830', name:'양양군' },
  ],
  '충청북도': [
    { code:'43111', name:'청주시 상당구' }, { code:'43112', name:'청주시 서원구' },
    { code:'43113', name:'청주시 흥덕구' }, { code:'43114', name:'청주시 청원구' },
    { code:'43130', name:'충주시' }, { code:'43150', name:'제천시' },
    { code:'43720', name:'보은군' }, { code:'43730', name:'옥천군' },
    { code:'43740', name:'영동군' }, { code:'43745', name:'증평군' },
    { code:'43750', name:'진천군' }, { code:'43760', name:'괴산군' },
    { code:'43770', name:'음성군' }, { code:'43800', name:'단양군' },
  ],
  '충청남도': [
    { code:'44131', name:'천안시 동남구' }, { code:'44133', name:'천안시 서북구' },
    { code:'44150', name:'공주시' }, { code:'44180', name:'보령시' },
    { code:'44200', name:'아산시' }, { code:'44210', name:'서산시' },
    { code:'44230', name:'논산시' }, { code:'44250', name:'계룡시' },
    { code:'44270', name:'당진시' }, { code:'44710', name:'금산군' },
    { code:'44760', name:'부여군' }, { code:'44770', name:'서천군' },
    { code:'44790', name:'청양군' }, { code:'44800', name:'홍성군' },
    { code:'44810', name:'예산군' }, { code:'44825', name:'태안군' },
  ],
  '전북특별자치도': [
    { code:'52111', name:'전주시 완산구' }, { code:'52113', name:'전주시 덕진구' },
    { code:'52130', name:'군산시' }, { code:'52140', name:'익산시' },
    { code:'52180', name:'정읍시' }, { code:'52190', name:'남원시' },
    { code:'52210', name:'김제시' }, { code:'52710', name:'완주군' },
    { code:'52720', name:'진안군' }, { code:'52730', name:'무주군' },
    { code:'52740', name:'장수군' }, { code:'52750', name:'임실군' },
    { code:'52770', name:'순창군' }, { code:'52790', name:'고창군' },
    { code:'52800', name:'부안군' },
  ],
  '전라남도': [
    { code:'46110', name:'목포시' }, { code:'46130', name:'여수시' },
    { code:'46150', name:'순천시' }, { code:'46170', name:'나주시' },
    { code:'46230', name:'광양시' }, { code:'46710', name:'담양군' },
    { code:'46720', name:'곡성군' }, { code:'46730', name:'구례군' },
    { code:'46770', name:'고흥군' }, { code:'46780', name:'보성군' },
    { code:'46790', name:'화순군' }, { code:'46800', name:'장흥군' },
    { code:'46810', name:'강진군' }, { code:'46820', name:'해남군' },
    { code:'46830', name:'영암군' }, { code:'46840', name:'무안군' },
    { code:'46860', name:'함평군' }, { code:'46870', name:'영광군' },
    { code:'46880', name:'장성군' }, { code:'46890', name:'완도군' },
    { code:'46900', name:'진도군' }, { code:'46910', name:'신안군' },
  ],
  '경상북도': [
    { code:'47111', name:'포항시 남구' }, { code:'47113', name:'포항시 북구' },
    { code:'47130', name:'경주시' }, { code:'47150', name:'김천시' },
    { code:'47170', name:'안동시' }, { code:'47190', name:'구미시' },
    { code:'47210', name:'영주시' }, { code:'47230', name:'영천시' },
    { code:'47250', name:'상주시' }, { code:'47280', name:'문경시' },
    { code:'47290', name:'경산시' }, { code:'47730', name:'의성군' },
    { code:'47750', name:'청송군' }, { code:'47760', name:'영양군' },
    { code:'47770', name:'영덕군' }, { code:'47820', name:'청도군' },
    { code:'47830', name:'고령군' }, { code:'47840', name:'성주군' },
    { code:'47850', name:'칠곡군' }, { code:'47900', name:'예천군' },
    { code:'47920', name:'봉화군' }, { code:'47930', name:'울진군' },
    { code:'47940', name:'울릉군' },
  ],
  '경상남도': [
    { code:'48121', name:'창원시 의창구'   }, { code:'48123', name:'창원시 성산구'    },
    { code:'48125', name:'창원시 마산합포구'}, { code:'48127', name:'창원시 마산회원구' },
    { code:'48129', name:'창원시 진해구'   }, { code:'48170', name:'진주시'           },
    { code:'48220', name:'통영시'          }, { code:'48240', name:'사천시'           },
    { code:'48250', name:'김해시'          }, { code:'48270', name:'밀양시'           },
    { code:'48310', name:'거제시'          }, { code:'48330', name:'양산시'           },
    { code:'48720', name:'의령군'          }, { code:'48730', name:'함안군'           },
    { code:'48740', name:'창녕군'          }, { code:'48820', name:'고성군'           },
    { code:'48840', name:'남해군'          }, { code:'48850', name:'하동군'           },
    { code:'48860', name:'산청군'          }, { code:'48870', name:'함양군'           },
    { code:'48880', name:'거창군'          }, { code:'48890', name:'합천군'           },
  ],
  '제주특별자치도': [
    { code:'50110', name:'제주시' },
    { code:'50130', name:'서귀포시' },
  ],
};

/* ═══════════════════════════════════════════════════════
   상태
═══════════════════════════════════════════════════════ */
let currentResults  = [];
let currentTradeType = 'apt-trade';
let sortCol = null;
let sortAsc = true;
let currentPage = 1;
let pageSize = 30;
let activeRows = []; // 현재 표시 중인 전체 행 (정렬·필터 반영)
let selectedRows = new Set(); // activeRows 기준 인덱스 집합
let selectedHistoryIds = new Set(); // 이력 모달 선택 ID 집합

/* ═══════════════════════════════════════════════════════
   초기화
═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildCityDropdown();
  buildYearDropdown();
  checkApiKey();
  loadCurrentUser();
});

function buildCityDropdown() {
  const sel = document.getElementById('city-select');
  Object.keys(REGIONS).forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = city;
    sel.appendChild(opt);
  });
}

function buildYearDropdown() {
  const now = new Date();
  const thisYear = now.getFullYear();
  const prevMonth = now.getMonth() === 0 ? 12 : now.getMonth();
  const prevYear  = now.getMonth() === 0 ? thisYear - 1 : thisYear;

  ['deal-year-start', 'deal-year-end'].forEach(id => {
    const sel = document.getElementById(id);
    for (let y = thisYear; y >= 2006; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y + '년';
      sel.appendChild(opt);
    }
    sel.value = prevYear;
  });

  // 기본값: 시작 = 3개월 전, 종료 = 전월
  const startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  document.getElementById('deal-year-start').value  = startDate.getFullYear();
  document.getElementById('deal-month-start').value = String(startDate.getMonth() + 1).padStart(2, '0');
  document.getElementById('deal-year-end').value    = prevYear;
  document.getElementById('deal-month-end').value   = String(prevMonth).padStart(2, '0');
}

function setPeriod(years) {
  const now  = new Date();
  // 종료: 전월
  const end   = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  // 시작: 종료로부터 (years*12 - 1)개월 전
  const start = new Date(end.getFullYear(), end.getMonth() - (years * 12 - 1), 1);

  document.getElementById('deal-year-start').value  = start.getFullYear();
  document.getElementById('deal-month-start').value = String(start.getMonth() + 1).padStart(2, '0');
  document.getElementById('deal-year-end').value    = end.getFullYear();
  document.getElementById('deal-month-end').value   = String(end.getMonth() + 1).padStart(2, '0');

  // 버튼 활성 표시
  document.querySelectorAll('.btn-period').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === years);
  });
}

function onCityChange() {
  const city = document.getElementById('city-select').value;
  const distSel = document.getElementById('district-select');
  distSel.innerHTML = '<option value="">-- 구/군/시 선택 --</option>';
  distSel.disabled = !city;
  resetDongSelect();
  if (!city) return;
  (REGIONS[city] || []).forEach(({ code, name }) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.dataset.name = name;
    opt.textContent = name;
    distSel.appendChild(opt);
  });
}

function resetDongSelect() {
  const dongSel = document.getElementById('filter-dong');
  dongSel.innerHTML = '<option value="">-- 구/군/시 선택 --</option>';
  dongSel.disabled = true;
}

async function onDistrictChange() {
  const distSel  = document.getElementById('district-select');
  const dongSel  = document.getElementById('filter-dong');
  const tradeType = document.getElementById('trade-type').value;

  if (!distSel.value) { resetDongSelect(); return; }

  dongSel.innerHTML = '<option value="">불러오는 중…</option>';
  dongSel.disabled = true;

  try {
    const headers = {};
    const savedKey = localStorage.getItem('serviceKey');
    if (savedKey) headers['x-service-key'] = savedKey;

    const res   = await fetch(`/api/dongs?regionCode=${distSel.value}&tradeType=${tradeType}`, { headers });
    const dongs = await res.json();

    dongSel.innerHTML = '<option value="">전체</option>' +
      dongs.map(d => `<option value="${d}">${d}</option>`).join('');
    dongSel.disabled = dongs.length === 0;
    if (dongs.length === 0) dongSel.innerHTML = '<option value="">데이터 없음</option>';
  } catch (_) {
    dongSel.innerHTML = '<option value="">불러오기 실패</option>';
    dongSel.disabled = false;
  }
}

function checkApiKey() {
  const key = localStorage.getItem('serviceKey');
  const btn = document.getElementById('settings-btn');
  if (!key) {
    btn.style.background = 'rgba(245,158,11,.35)';
    btn.title = 'API 키 미설정 — 클릭하여 설정';
  }
}

/* ═══════════════════════════════════════════════════════
   검색
═══════════════════════════════════════════════════════ */
async function handleSearch() {
  const cityVal  = document.getElementById('city-select').value;
  const distSel  = document.getElementById('district-select');
  const regionCode = distSel.value;
  const tradeType  = document.getElementById('trade-type').value;

  const yearStart  = document.getElementById('deal-year-start').value;
  const monthStart = document.getElementById('deal-month-start').value;
  const yearEnd    = document.getElementById('deal-year-end').value;
  const monthEnd   = document.getElementById('deal-month-end').value;

  if (!cityVal || !regionCode) { showToast('지역을 선택해주세요.', 'error'); return; }

  const dealYmdStart = yearStart + monthStart;
  const dealYmdEnd   = yearEnd + monthEnd;

  if (dealYmdStart > dealYmdEnd) {
    showToast('시작 기간이 종료 기간보다 늦습니다.', 'error'); return;
  }

  const selectedOpt = distSel.options[distSel.selectedIndex];
  const regionName  = cityVal + ' ' + (selectedOpt?.dataset?.name || '');

  setLoading(true);
  document.getElementById('search-btn').disabled = true;

  try {
    const headers = { 'Content-Type': 'application/json' };
    const savedKey = localStorage.getItem('serviceKey');
    if (savedKey) headers['x-service-key'] = savedKey;

    const res = await fetch('/api/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({ regionCode, regionName, dealYmdStart, dealYmdEnd, tradeType }),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      showToast(data.error || '조회 실패', 'error');
      return;
    }

    currentResults   = data.data;
    currentTradeType = tradeType;
    currentPage      = 1;
    sortCol          = null;
    sortAsc          = true;
    selectedRows.clear();
    activeRows       = getFilteredRows();
    renderResults(data);
    loadHistory();

    showToast(`총 ${data.fetchedCount.toLocaleString()}건 조회 완료`, 'success');
    loadHistory(); // 이력 갱신 (모달 열려 있을 경우 대비)

  } catch (e) {
    showToast('네트워크 오류: ' + e.message, 'error');
  } finally {
    setLoading(false);
    document.getElementById('search-btn').disabled = false;
  }
}

/* ═══════════════════════════════════════════════════════
   결과 렌더링
═══════════════════════════════════════════════════════ */
const TRADE_COLUMNS = {
  'apt-trade': [
    { key: 'apt_name',    label: '아파트명'    },
    { key: 'dong',        label: '법정동'      },
    { key: 'road_name',   label: '도로명'      },
    { key: 'deal_date',   label: '거래일'      },
    { key: 'area',        label: '전용면적(㎡)' },
    { key: 'pyeong',      label: '평수'        },
    { key: 'floor',       label: '층'          },
    { key: 'build_year',  label: '건축년도'    },
    { key: 'deal_amount', label: '거래금액(만원)', cls:'amount' },
    { key: 'deal_type',   label: '거래유형'    },
    { key: 'cancel_yn',   label: '해제'        },
  ],
  'apt-rent': [
    { key: 'apt_name',        label: '아파트명'       },
    { key: 'dong',            label: '법정동'         },
    { key: 'deal_date',       label: '계약일'         },
    { key: 'area',            label: '전용면적(㎡)'    },
    { key: 'pyeong',          label: '평수'           },
    { key: 'floor',           label: '층'             },
    { key: 'build_year',      label: '건축년도'       },
    { key: 'deposit',         label: '보증금(만원)',    cls:'amount' },
    { key: 'monthly_rent',    label: '월세(만원)',     cls:'amount' },
    { key: 'contract_type',   label: '계약구분'       },
    { key: 'contract_period', label: '계약기간'       },
  ],
  'villa-trade': [
    { key: 'apt_name',    label: '단지명'      },
    { key: 'dong',        label: '법정동'      },
    { key: 'road_name',   label: '도로명'      },
    { key: 'deal_date',   label: '거래일'      },
    { key: 'area',        label: '전용면적(㎡)' },
    { key: 'pyeong',      label: '평수'        },
    { key: 'floor',       label: '층'          },
    { key: 'build_year',  label: '건축년도'    },
    { key: 'deal_amount', label: '거래금액(만원)', cls:'amount' },
    { key: 'deal_type',   label: '거래유형'    },
  ],
  'house-trade': [
    { key: 'apt_name',    label: '건물명'      },
    { key: 'dong',        label: '법정동'      },
    { key: 'deal_date',   label: '거래일'      },
    { key: 'area',        label: '연면적(㎡)'   },
    { key: 'pyeong',      label: '평수'        },
    { key: 'build_year',  label: '건축년도'    },
    { key: 'house_type',  label: '주택유형'    },
    { key: 'deal_amount', label: '거래금액(만원)', cls:'amount' },
    { key: 'deal_type',   label: '거래유형'    },
  ],
  'office-trade': [
    { key: 'apt_name',    label: '단지명'      },
    { key: 'dong',        label: '법정동'      },
    { key: 'deal_date',   label: '거래일'      },
    { key: 'area',        label: '전용면적(㎡)' },
    { key: 'pyeong',      label: '평수'        },
    { key: 'floor',       label: '층'          },
    { key: 'build_year',  label: '건축년도'    },
    { key: 'deal_amount', label: '거래금액(만원)', cls:'amount' },
    { key: 'deal_type',   label: '거래유형'    },
  ],
  'office-rent': [
    { key: 'apt_name',        label: '단지명'         },
    { key: 'dong',            label: '법정동'         },
    { key: 'deal_date',       label: '계약일'         },
    { key: 'area',            label: '전용면적(㎡)'    },
    { key: 'pyeong',          label: '평수'           },
    { key: 'floor',           label: '층'             },
    { key: 'build_year',      label: '건축년도'       },
    { key: 'deposit',         label: '보증금(만원)',    cls:'amount' },
    { key: 'monthly_rent',    label: '월세(만원)',     cls:'amount' },
    { key: 'contract_type',   label: '계약구분'       },
    { key: 'contract_period', label: '계약기간'       },
  ],
};

/* ═══════════════════════════════════════════════════════
   읍면동 · 면적 필터
═══════════════════════════════════════════════════════ */
function getFilteredRows() {
  const dong     = (document.getElementById('filter-dong')?.value || '').trim();
  const areaMin  = parseFloat(document.getElementById('filter-area-min')?.value);
  const areaMax  = parseFloat(document.getElementById('filter-area-max')?.value);
  const floorMin = parseFloat(document.getElementById('filter-floor-min')?.value);
  const floorMax = parseFloat(document.getElementById('filter-floor-max')?.value);
  const yearMin  = parseFloat(document.getElementById('filter-year-min')?.value);
  const yearMax  = parseFloat(document.getElementById('filter-year-max')?.value);

  return currentResults.filter(row => {
    if (dong && String(row.dong || '').trim() !== dong) return false;
    const area = parseFloat(row.area);
    if (!isNaN(areaMin) && (isNaN(area) || area < areaMin)) return false;
    if (!isNaN(areaMax) && (isNaN(area) || area > areaMax)) return false;
    const floor = parseFloat(row.floor);
    if (!isNaN(floorMin) && (isNaN(floor) || floor < floorMin)) return false;
    if (!isNaN(floorMax) && (isNaN(floor) || floor > floorMax)) return false;
    const buildYear = parseFloat(row.build_year);
    if (!isNaN(yearMin) && (isNaN(buildYear) || buildYear < yearMin)) return false;
    if (!isNaN(yearMax) && (isNaN(buildYear) || buildYear > yearMax)) return false;
    return true;
  });
}

function applyFilters() {
  if (!currentResults.length) return;
  selectedRows.clear();
  activeRows  = getFilteredRows();
  currentPage = 1;
  sortCol     = null;
  sortAsc     = true;
  document.querySelectorAll('#results-thead th').forEach(th =>
    th.classList.remove('sort-asc', 'sort-desc')
  );
  renderPage();
  updateAnalysisPanel();
  document.getElementById('results-badge').textContent = `${activeRows.length.toLocaleString()}건`;
}

function renderResults(data) {
  document.getElementById('empty-state').style.display = 'none';
  const section = document.getElementById('results-section');
  section.style.display = '';
  collapseSidebarOnMobile();

  const cols = TRADE_COLUMNS[currentTradeType] || TRADE_COLUMNS['apt-trade'];

  // 헤더 (체크박스 컬럼 포함, 데이터 컬럼은 1-based 인덱스로 전달)
  const thead = document.getElementById('results-thead');
  thead.innerHTML = '<tr><th class="th-check"><input type="checkbox" id="select-all-chk"></th>' +
    cols.map((c, i) => `<th onclick="sortTable(${i + 1},'${c.key}')">${c.label}</th>`).join('') +
  '</tr>';

  document.getElementById('select-all-chk').addEventListener('change', function () {
    toggleSelectAll(this.checked);
  });

  // 정렬 아이콘 복원 (체크박스 th가 index 0이므로 +1 오프셋)
  if (sortCol) {
    const colIdx = cols.findIndex(c => c.key === sortCol);
    if (colIdx >= 0) {
      const ths = document.querySelectorAll('#results-thead th');
      ths[colIdx + 1]?.classList.add(sortAsc ? 'sort-asc' : 'sort-desc');
    }
  }

  renderPage();
}

function renderPage() {
  const cols  = TRADE_COLUMNS[currentTradeType] || TRADE_COLUMNS['apt-trade'];
  const total = activeRows.length;
  const start = (currentPage - 1) * pageSize;
  const end   = Math.min(start + pageSize, total);
  const rows  = activeRows.slice(start, end);

  // 배지
  document.getElementById('results-badge').textContent = `${total.toLocaleString()}건`;

  // 바디
  const tbody = document.getElementById('results-tbody');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="${cols.length + 1}" class="empty-msg">조회 결과가 없습니다.</td></tr>`;
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  tbody.innerHTML = rows.map((row, pageIdx) => {
    const globalIdx = start + pageIdx;
    const isChecked = selectedRows.has(globalIdx);
    const dealDate = [row.deal_year, row.deal_month, row.deal_day].filter(Boolean).join('.');
    const chk = `<td class="td-check"><input type="checkbox" class="row-chk" data-idx="${globalIdx}" ${isChecked ? 'checked' : ''}></td>`;
    return `<tr class="${isChecked ? 'row-selected' : ''}">` + chk + cols.map(c => {
      let val = c.key === 'deal_date' ? dealDate : (row[c.key] ?? '');
      let display = val;
      if ((c.key === 'deal_amount' || c.key === 'deposit') && val) {
        display = formatAmount(val);
      } else if (c.key === 'monthly_rent' && val) {
        display = val === '0' ? '-' : formatAmount(val);
      } else if (c.key === 'pyeong') {
        const a = parseFloat(row.area);
        display = isNaN(a) ? '' : (a / 3.3058).toFixed(1) + '평';
      } else if (c.key === 'area' && val) {
        display = parseFloat(val).toFixed(2);
      } else if (c.key === 'cancel_yn' && val === 'O') {
        display = `<span class="cancelled">해제</span>`;
      } else if (c.key === 'contract_type' && val) {
        const cls = val === '신규' ? 'tag-new' : 'tag-renew';
        display = `<span class="tag ${cls}">${val}</span>`;
      }
      const cls = c.cls ? ` class="${c.cls}"` : '';
      return `<td${cls}>${display}</td>`;
    }).join('') + '</tr>';
  }).join('');

  // 체크박스 이벤트 바인딩
  document.querySelectorAll('.row-chk').forEach(chk => {
    chk.addEventListener('change', function () {
      const idx = parseInt(this.dataset.idx);
      if (this.checked) {
        selectedRows.add(idx);
        this.closest('tr').classList.add('row-selected');
      } else {
        selectedRows.delete(idx);
        this.closest('tr').classList.remove('row-selected');
      }
      updateSelectAllState();
      updateAnalysisPanel();
    });
  });

  updateSelectAllState();

  // 페이지네이션
  const totalPages = Math.ceil(total / pageSize);
  renderPagination(totalPages, start, end, total);
}

function renderPagination(totalPages, start, end, total) {
  const el = document.getElementById('pagination');
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  const WING = 2;
  let pages = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || (p >= currentPage - WING && p <= currentPage + WING)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  const btn = (label, page, disabled, active) =>
    `<button class="page-btn${active ? ' active' : ''}" ${disabled ? 'disabled' : `onclick="changePage(${page})"`}>${label}</button>`;

  el.innerHTML =
    btn('‹', currentPage - 1, currentPage === 1, false) +
    pages.map(p => p === '…'
      ? `<span class="page-ellipsis">…</span>`
      : btn(p, p, false, p === currentPage)
    ).join('') +
    btn('›', currentPage + 1, currentPage === totalPages, false) +
    `<span class="page-info">${start + 1}–${end} / ${total.toLocaleString()}건</span>`;
}

function changePage(page) {
  currentPage = page;
  renderPage();
  document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
}

function changePageSize() {
  pageSize    = parseInt(document.getElementById('page-size').value, 10);
  currentPage = 1;
  renderPage();
}

function sortTable(colIdx, key) {
  const ths = document.querySelectorAll('#results-thead th');
  ths.forEach(th => th.classList.remove('sort-asc', 'sort-desc'));

  if (sortCol === key) {
    sortAsc = !sortAsc;
  } else {
    sortCol = key;
    sortAsc = true;
  }
  ths[colIdx].classList.add(sortAsc ? 'sort-asc' : 'sort-desc');

  selectedRows.clear();

  activeRows = [...currentResults].sort((a, b) => {
    let va = key === 'deal_date'
      ? `${a.deal_year}${a.deal_month}${a.deal_day}`
      : (a[key] ?? '');
    let vb = key === 'deal_date'
      ? `${b.deal_year}${b.deal_month}${b.deal_day}`
      : (b[key] ?? '');
    const na = parseFloat(String(va).replace(/,/g, ''));
    const nb = parseFloat(String(vb).replace(/,/g, ''));
    if (!isNaN(na) && !isNaN(nb)) return sortAsc ? na - nb : nb - na;
    return sortAsc ? String(va).localeCompare(String(vb), 'ko')
                   : String(vb).localeCompare(String(va), 'ko');
  });

  currentPage = 1;
  renderPage();
  updateAnalysisPanel();
}

/* ═══════════════════════════════════════════════════════
   체크박스 · 분석 패널
═══════════════════════════════════════════════════════ */
function toggleSelectAll(checked) {
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, activeRows.length);
  for (let i = start; i < end; i++) {
    if (checked) selectedRows.add(i);
    else selectedRows.delete(i);
  }
  renderPage();
  updateAnalysisPanel();
}

function updateSelectAllState() {
  const chk = document.getElementById('select-all-chk');
  if (!chk) return;
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, activeRows.length);
  let allChecked = end > start;
  let anyChecked = false;
  for (let i = start; i < end; i++) {
    if (selectedRows.has(i)) anyChecked = true;
    else allChecked = false;
  }
  chk.checked = allChecked;
  chk.indeterminate = anyChecked && !allChecked;
}

function clearSelection() {
  selectedRows.clear();
  renderPage();
  updateAnalysisPanel();
}

function updateAnalysisPanel() {
  const panel = document.getElementById('analysis-panel');
  if (selectedRows.size === 0) {
    panel.style.display = 'none';
    return;
  }
  panel.style.display = '';

  const isRent = currentTradeType === 'apt-rent' || currentTradeType === 'office-rent';
  const amountKey = isRent ? 'deposit' : 'deal_amount';
  const isHouse = currentTradeType === 'house-trade';

  document.getElementById('analysis-basis').textContent = isRent ? '보증금 기준' : '거래금액 기준';
  document.getElementById('stat-amount-label').textContent = isRent ? '평균 보증금' : '평균 거래금액';
  document.getElementById('stat-area-label').textContent = isHouse ? '평균 연면적' : '평균 전용면적';

  const perPyeongList = [];
  let totalAmount = 0;
  let totalArea = 0;
  let validCount = 0;

  selectedRows.forEach(idx => {
    const row = activeRows[idx];
    if (!row) return;
    const area = parseFloat(row.area);
    const amount = parseInt(String(row[amountKey] || '').replace(/,/g, ''), 10);
    if (isNaN(area) || area <= 0 || isNaN(amount) || amount <= 0) return;
    const pyeong = area / 3.3058;
    perPyeongList.push(amount / pyeong);
    totalAmount += amount;
    totalArea += area;
    validCount++;
  });

  document.getElementById('analysis-count-num').textContent = selectedRows.size.toLocaleString();

  if (perPyeongList.length === 0) {
    ['stat-avg', 'stat-min', 'stat-max', 'stat-avg-amount', 'stat-avg-area'].forEach(id => {
      document.getElementById(id).textContent = '-';
    });
    return;
  }

  const avg = perPyeongList.reduce((a, b) => a + b, 0) / perPyeongList.length;
  const min = Math.min(...perPyeongList);
  const max = Math.max(...perPyeongList);
  const fmt = v => Math.round(v).toLocaleString() + '만/평';

  document.getElementById('stat-avg').textContent = fmt(avg);
  document.getElementById('stat-min').textContent = fmt(min);
  document.getElementById('stat-max').textContent = fmt(max);
  document.getElementById('stat-avg-amount').textContent =
    formatAmount(Math.round(totalAmount / validCount).toString());
  const avgArea = totalArea / validCount;
  document.getElementById('stat-avg-area').textContent =
    avgArea.toFixed(2) + '㎡ (' + (avgArea / 3.3058).toFixed(1) + '평)';
}

/* ═══════════════════════════════════════════════════════
   이력
═══════════════════════════════════════════════════════ */
const TRADE_TYPE_LABELS = {
  'apt-trade':    '아파트 매매',
  'apt-rent':     '아파트 전월세',
  'villa-trade':  '연립다세대 매매',
  'house-trade':  '단독/다가구 매매',
  'office-trade': '오피스텔 매매',
  'office-rent':  '오피스텔 전월세',
};

async function loadHistory() {
  const res  = await fetch('/api/history');
  const list = await res.json();
  const el   = document.getElementById('history-modal-list');
  if (!el) return;

  // 선택 초기화
  selectedHistoryIds.clear();
  const toolbar = document.getElementById('history-toolbar');
  const allChk  = document.getElementById('history-select-all-chk');
  if (toolbar) toolbar.style.display = list.length > 0 ? '' : 'none';
  if (allChk)  { allChk.checked = false; allChk.indeterminate = false; }
  const countEl = document.getElementById('history-selected-count');
  if (countEl) countEl.textContent = '';

  if (!list.length) {
    el.innerHTML = '<p class="empty-msg">조회 이력이 없습니다.</p>';
    return;
  }

  el.innerHTML = list.map(h => {
    const fmtYmd = s => s.slice(0,4) + '년 ' + s.slice(4) + '월';
    const ym = h.deal_ymd.includes('~')
      ? h.deal_ymd.split('~').map(fmtYmd).join(' ~ ')
      : fmtYmd(h.deal_ymd);
    const dt = new Date(h.created_at).toLocaleString('ko-KR');
    const typeLabel = TRADE_TYPE_LABELS[h.trade_type] || h.trade_type;
    return `
      <div class="history-item" onclick="viewHistory(${h.id},'${h.trade_type}')">
        <input type="checkbox" class="history-chk" data-id="${h.id}"
          onclick="event.stopPropagation()" onchange="toggleHistoryItem(this)">
        <div class="history-left">
          <span class="history-title">${h.region_name} · ${ym}</span>
          <span class="history-meta">${typeLabel} · ${dt}</span>
        </div>
        <div class="history-right">
          <span class="history-count">${h.result_count.toLocaleString()}건</span>
          <button class="btn-delete" onclick="deleteHistory(event,${h.id})" title="삭제">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>`;
  }).join('');
}

function toggleHistoryItem(chk) {
  const id = parseInt(chk.dataset.id);
  if (chk.checked) selectedHistoryIds.add(id);
  else selectedHistoryIds.delete(id);
  updateHistoryToolbar();
}

function toggleHistorySelectAll(checked) {
  document.querySelectorAll('.history-chk').forEach(chk => {
    chk.checked = checked;
    const id = parseInt(chk.dataset.id);
    if (checked) selectedHistoryIds.add(id);
    else selectedHistoryIds.delete(id);
  });
  updateHistoryToolbar();
}

function updateHistoryToolbar() {
  const count   = selectedHistoryIds.size;
  const countEl = document.getElementById('history-selected-count');
  if (countEl) countEl.textContent = count > 0 ? `${count}건 선택됨` : '';
  const allChk = document.getElementById('history-select-all-chk');
  const chks   = document.querySelectorAll('.history-chk');
  if (allChk && chks.length > 0) {
    const all = [...chks].every(c => c.checked);
    const any = [...chks].some(c => c.checked);
    allChk.checked       = all;
    allChk.indeterminate = any && !all;
  }
}

async function deleteSelectedHistory() {
  if (selectedHistoryIds.size === 0) {
    showToast('선택된 항목이 없습니다.', 'error');
    return;
  }
  if (!confirm(`선택한 ${selectedHistoryIds.size}건의 이력을 삭제하시겠습니까?`)) return;
  await fetch('/api/history/batch', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: [...selectedHistoryIds] }),
  });
  loadHistory();
  showToast('선택한 이력이 삭제되었습니다.');
}

async function deleteAllHistory() {
  if (!confirm('모든 조회 이력을 삭제하시겠습니까?')) return;
  await fetch('/api/history/all', { method: 'DELETE' });
  loadHistory();
  showToast('전체 이력이 삭제되었습니다.');
}

async function viewHistory(id, tradeType) {
  closeHistoryModal();
  setLoading(true);
  try {
    const res  = await fetch(`/api/history/${id}/transactions`);
    const data = await res.json();
    currentResults   = data;
    currentTradeType = tradeType;
    currentPage      = 1;
    sortCol          = null;
    sortAsc          = true;
    selectedRows.clear();
    activeRows       = getFilteredRows();
    renderResults({});
    document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    setLoading(false);
  }
}

function openHistoryModal() {
  loadHistory();
  document.getElementById('history-modal').style.display = 'grid';
}
function closeHistoryModal() {
  document.getElementById('history-modal').style.display = 'none';
}
function closeHistoryOutside(e) {
  if (e.target.id === 'history-modal') closeHistoryModal();
}

async function deleteHistory(e, id) {
  e.stopPropagation();
  if (!confirm('이 조회 이력을 삭제하시겠습니까?')) return;
  await fetch(`/api/history/${id}`, { method: 'DELETE' });
  selectedHistoryIds.delete(id);
  loadHistory();
  showToast('삭제되었습니다.');
}

/* ═══════════════════════════════════════════════════════
   CSV 내보내기
═══════════════════════════════════════════════════════ */
function exportCSV() {
  if (!currentResults.length) { showToast('내보낼 데이터가 없습니다.', 'error'); return; }

  const cols = TRADE_COLUMNS[currentTradeType] || TRADE_COLUMNS['apt-trade'];
  const header = cols.map(c => c.label).join(',');

  const rows = currentResults.map(row => {
    return cols.map(c => {
      let val = c.key === 'deal_date'
        ? `${row.deal_year || ''}.${row.deal_month || ''}.${row.deal_day || ''}`
        : c.key === 'pyeong'
          ? (() => { const a = parseFloat(row.area); return isNaN(a) ? '' : (a / 3.3058).toFixed(1); })()
          : (row[c.key] ?? '');
      // CSV escape
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(',');
  });

  const csv     = '\uFEFF' + [header, ...rows].join('\n'); // BOM for Excel
  const blob    = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href        = url;
  a.download    = `실거래가_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════════════
   설정 모달
═══════════════════════════════════════════════════════ */
function openSettings() {
  const key = localStorage.getItem('serviceKey') || '';
  document.getElementById('api-key-input').value = key;
  document.getElementById('settings-modal').style.display = 'grid';
}
function closeSettings() {
  document.getElementById('settings-modal').style.display = 'none';
}
function closeSettingsOutside(e) {
  if (e.target.id === 'settings-modal') closeSettings();
}
function saveSettings() {
  const key = document.getElementById('api-key-input').value.trim();
  if (key) {
    localStorage.setItem('serviceKey', key);
    document.getElementById('settings-btn').style.background = '';
    document.getElementById('settings-btn').title = 'API 키 설정';
    showToast('API 키가 저장되었습니다.', 'success');
  } else {
    localStorage.removeItem('serviceKey');
    showToast('API 키가 삭제되었습니다.');
  }
  closeSettings();
}

/* ═══════════════════════════════════════════════════════
   계정 관리
═══════════════════════════════════════════════════════ */
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const icon    = document.getElementById('sidebar-toggle-icon');
  const poly    = icon && icon.querySelector('polyline');
  const isNowCollapsed = sidebar.classList.toggle('sidebar-collapsed');
  if (poly) poly.setAttribute('points', isNowCollapsed ? '6 9 12 15 18 9' : '18 15 12 9 6 15');
}

function collapseSidebarOnMobile() {
  if (window.innerWidth <= 900) {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('sidebar-collapsed')) return;
    sidebar.classList.add('sidebar-collapsed');
    const icon = document.getElementById('sidebar-toggle-icon');
    const poly = icon && icon.querySelector('polyline');
    if (poly) poly.setAttribute('points', '6 9 12 15 18 9');
  }
}

async function loadCurrentUser() {
  try {
    const res  = await fetch('/auth/me');
    const data = await res.json();
    const el   = document.getElementById('header-user');
    if (el && data.id) el.textContent = data.id;
  } catch (_) {}
}

async function handleLogout() {
  await fetch('/auth/logout', { method: 'POST' });
  window.location.href = '/login';
}

function openAdminModal() {
  ['admin-cur-pw','admin-new-id','admin-new-pw',
   'rec-cur-pw','rec-new-name','rec-new-phone','rec-new-birth','rec-new-pin']
    .forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('admin-error').style.display = 'none';
  document.getElementById('recovery-change-error').style.display = 'none';
  switchAdminTab('account');
  document.getElementById('admin-modal').style.display = 'grid';
}

function switchAdminTab(tab) {
  document.getElementById('admin-tab-account').style.display  = tab === 'account'  ? '' : 'none';
  document.getElementById('admin-tab-recovery').style.display = tab === 'recovery' ? '' : 'none';
  document.querySelectorAll('.admin-tab').forEach((el, i) => {
    el.classList.toggle('active', (i === 0) === (tab === 'account'));
  });
}
function closeAdminModal() {
  document.getElementById('admin-modal').style.display = 'none';
}
function closeAdminOutside(e) {
  if (e.target.id === 'admin-modal') closeAdminModal();
}

async function handleChangeCredentials() {
  const currentPassword = document.getElementById('admin-cur-pw').value;
  const newId           = document.getElementById('admin-new-id').value.trim();
  const newPassword     = document.getElementById('admin-new-pw').value;
  const err             = document.getElementById('admin-error');
  err.style.display = 'none';

  if (!currentPassword || !newId || !newPassword) {
    err.textContent   = '모든 항목을 입력해주세요.';
    err.style.display = 'block';
    return;
  }

  try {
    const res  = await fetch('/auth/change', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ currentPassword, newId, newPassword }),
    });
    const data = await res.json();
    if (data.success) {
      closeAdminModal();
      showToast('계정 정보가 변경되었습니다.', 'success');
      const el = document.getElementById('header-user');
      if (el) el.textContent = newId;
    } else {
      err.textContent   = data.error || '변경에 실패했습니다.';
      err.style.display = 'block';
    }
  } catch (_) {
    err.textContent   = '서버 오류가 발생했습니다.';
    err.style.display = 'block';
  }
}

async function handleChangeRecovery() {
  const currentPassword = document.getElementById('rec-cur-pw').value;
  const name        = document.getElementById('rec-new-name').value.trim();
  const phone_last4 = document.getElementById('rec-new-phone').value.trim();
  const birthdate   = document.getElementById('rec-new-birth').value.trim();
  const pin         = document.getElementById('rec-new-pin').value.trim();
  const err         = document.getElementById('recovery-change-error');
  err.style.display = 'none';

  if (!currentPassword || !name || !phone_last4 || !birthdate || !pin) {
    err.textContent   = '모든 항목을 입력해주세요.';
    err.style.display = 'block';
    return;
  }

  try {
    const res  = await fetch('/auth/change-recovery', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ currentPassword, name, phone_last4, birthdate, pin }),
    });
    const data = await res.json();
    if (data.success) {
      closeAdminModal();
      showToast('복구 정보가 변경되었습니다.', 'success');
    } else {
      err.textContent   = data.error || '변경에 실패했습니다.';
      err.style.display = 'block';
    }
  } catch (_) {
    err.textContent   = '서버 오류가 발생했습니다.';
    err.style.display = 'block';
  }
}

/* ═══════════════════════════════════════════════════════
   유틸
═══════════════════════════════════════════════════════ */
function formatAmount(val) {
  if (!val) return '-';
  const n = parseInt(String(val).replace(/,/g, ''), 10);
  if (isNaN(n)) return val;
  if (n >= 10000) {
    const 억 = Math.floor(n / 10000);
    const 만 = n % 10000;
    return 만 === 0
      ? `${억}억`
      : `${억}억 ${만.toLocaleString()}만`;
  }
  return `${n.toLocaleString()}만`;
}

function setLoading(on) {
  document.getElementById('loading').style.display = on ? 'grid' : 'none';
}

let _toastTimer;
function showToast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className   = 'toast' + (type ? ' ' + type : '');
  void el.offsetWidth; // reflow
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
}
