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
  // 현재 주택수 복원
  const housingEl = document.getElementById('header-housing-count');
  if (housingEl) housingEl.value = localStorage.getItem('housingCount') || '0';
  // naver-view가 활성화될 때 showNaverBoard가 불리므로 여기선 생략
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
  const aptName  = (document.getElementById('filter-apt-name')?.value || '').trim().toLowerCase();
  const areaMin  = parseFloat(document.getElementById('filter-area-min')?.value);
  const areaMax  = parseFloat(document.getElementById('filter-area-max')?.value);
  const floorMin = parseFloat(document.getElementById('filter-floor-min')?.value);
  const floorMax = parseFloat(document.getElementById('filter-floor-max')?.value);
  const yearMin  = parseFloat(document.getElementById('filter-year-min')?.value);
  const yearMax  = parseFloat(document.getElementById('filter-year-max')?.value);

  return currentResults.filter(row => {
    if (dong && String(row.dong || '').trim() !== dong) return false;
    if (aptName && !String(row.apt_name || '').toLowerCase().includes(aptName)) return false;
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

function onTradeTypeChange() {
  const tradeType = document.getElementById('trade-type').value;
  const isApt = tradeType === 'apt-trade' || tradeType === 'apt-rent';
  const group = document.getElementById('filter-aptname-group');
  if (group) {
    group.style.display = isApt ? '' : 'none';
    if (!isApt) document.getElementById('filter-apt-name').value = '';
  }
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
        const cls = val === '신건' ? 'tag-new' : 'tag-renew';
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
  /* 현재 아이디를 새 아이디 입력란에 미리 채움 */
  const curId = document.getElementById('header-user')?.textContent?.trim();
  if (curId) document.getElementById('admin-new-id').value = curId;
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

/* ═══════════════════════════════════════════════════════
   뷰 전환 (실거래가 ↔ 부동산경매)
═══════════════════════════════════════════════════════ */
let currentView = 'realestate';

function switchView(view) {
  currentView = view;

  const searchBody        = document.getElementById('sidebar-search-body');
  const realestateView    = document.getElementById('realestate-view');
  const auctionView       = document.getElementById('auction-view');
  const myAuctionView     = document.getElementById('my-auction-view');
  const naverView         = document.getElementById('naver-view');
  const historyBtn        = document.getElementById('history-btn');
  const auctionFilterBody = document.getElementById('sidebar-auction-filter-body');
  const myAuctionBody     = document.getElementById('sidebar-my-auction-body');
  const naverBody         = document.getElementById('sidebar-naver-body');

  searchBody.style.display     = view === 'realestate' ? '' : 'none';
  if (auctionFilterBody) auctionFilterBody.style.display = view === 'auction'    ? '' : 'none';
  if (myAuctionBody)     myAuctionBody.style.display     = view === 'my-auction' ? '' : 'none';
  if (naverBody)         naverBody.style.display         = view === 'naver'      ? '' : 'none';
  realestateView.style.display = view === 'realestate' ? ''     : 'none';
  auctionView.style.display    = view === 'auction'    ? 'flex' : 'none';
  if (myAuctionView) myAuctionView.style.display = view === 'my-auction' ? 'flex' : 'none';
  if (naverView)     naverView.style.display     = view === 'naver'      ? 'flex' : 'none';
  if (historyBtn) historyBtn.style.display = view === 'realestate' ? '' : 'none';

  document.querySelectorAll('.sidebar-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });

  if (view === 'auction')    loadAuctions();
  if (view === 'my-auction') loadMyAuctions();
  if (view === 'naver' && !window._naverActiveId) showNaverBoard();
}

/* ═══════════════════════════════════════════════════════
   부동산경매
═══════════════════════════════════════════════════════ */
let auctionData     = [];
let auctionFiltered = [];
let auctionSelected = new Set();
let auctionPage     = 1;
let auctionPageSize = 30;

async function loadAuctions() {
  try {
    const res  = await fetch('/api/auction');
    const data = await res.json();
    auctionData = Array.isArray(data) ? data : [];
  } catch (_) {
    auctionData = [];
  }
  // 전체 데이터 기준 순번 자동 부여 (1, 2, 3, ...)
  auctionData.forEach((r, i) => { r._seq = i + 1; });
  auctionSelected.clear();
  populateAuctionFilters();
  applyAuctionFilter();

  // 층수 미설정 데이터 있으면 서버 측 마이그레이션 실행 (백그라운드)
  if (auctionData.some(r => r.address && r.floor == null)) {
    fetch('/api/auction/migrate-floor', { method: 'POST' })
      .then(r => r.json())
      .then(d => { if (d.updated > 0) loadAuctions(); })
      .catch(() => {});
  }

  // Enter 키로 조회
  document.querySelectorAll('#sidebar-auction-filter-body input[type="number"]').forEach(el => {
    el.addEventListener('keydown', e => { if (e.key === 'Enter') applyAuctionFilter(); });
  });
}

/* 물건종류·지역 셀렉트 옵션 채우기 */
function populateAuctionFilters() {
  const types   = [...new Set(auctionData.map(r => r.item_type).filter(Boolean))].sort();
  const regions = [...new Set(auctionData.map(r => r.region).filter(Boolean))].sort();

  const selType   = document.getElementById('af-item-type');
  const selRegion = document.getElementById('af-region');
  if (!selType || !selRegion) return;

  const prevType   = selType.value;
  const prevRegion = selRegion.value;

  selType.innerHTML   = '<option value="">전체</option>' + types.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
  selRegion.innerHTML = '<option value="">전체</option>' + regions.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');

  // 이전 선택값 복원
  if (types.includes(prevType))   selType.value   = prevType;
  if (regions.includes(prevRegion)) selRegion.value = prevRegion;
}

/* 필터 적용 */
function applyAuctionFilter() {
  const itemType    = document.getElementById('af-item-type')?.value || '';
  const region      = document.getElementById('af-region')?.value   || '';
  const status      = document.getElementById('af-status')?.value   || '';
  const floorFrom   = document.getElementById('af-floor-from')?.value !== '' ? parseInt(document.getElementById('af-floor-from')?.value, 10) : null;
  const floorTo     = document.getElementById('af-floor-to')?.value   !== '' ? parseInt(document.getElementById('af-floor-to')?.value,   10) : null;
  const minPriceFrom = parseFloat(document.getElementById('af-min-price-from')?.value) || null;
  const minPriceTo   = parseFloat(document.getElementById('af-min-price-to')?.value)   || null;
  const officialFrom = parseFloat(document.getElementById('af-official-from')?.value)  || null;
  const officialTo   = parseFloat(document.getElementById('af-official-to')?.value)    || null;
  const buildingFrom = parseFloat(document.getElementById('af-building-from')?.value)  || null;
  const buildingTo   = parseFloat(document.getElementById('af-building-to')?.value)    || null;

  auctionFiltered = auctionData.filter(r => {
    if (itemType && r.item_type !== itemType) return false;
    if (region   && r.region    !== region)   return false;
    if (status   && r.status    !== status)   return false;
    if (floorFrom !== null && (r.floor == null || r.floor < floorFrom)) return false;
    if (floorTo   !== null && (r.floor == null || r.floor > floorTo))   return false;
    // 입력값: 만원 단위, DB 저장값: 만원 단위 → 직접 비교
    if (minPriceFrom !== null && (r.min_price == null || r.min_price < minPriceFrom)) return false;
    if (minPriceTo   !== null && (r.min_price == null || r.min_price > minPriceTo))   return false;
    if (officialFrom !== null && (r.official_price == null || r.official_price < officialFrom)) return false;
    if (officialTo   !== null && (r.official_price == null || r.official_price > officialTo))   return false;
    if (buildingFrom !== null && (r.building_area == null || r.building_area < buildingFrom)) return false;
    if (buildingTo   !== null && (r.building_area == null || r.building_area > buildingTo))   return false;
    return true;
  });

  const info = document.getElementById('af-result-count');
  if (info) {
    const isFiltered = auctionFiltered.length !== auctionData.length;
    info.textContent = isFiltered
      ? `${auctionFiltered.length.toLocaleString()}건 표시 / 전체 ${auctionData.length.toLocaleString()}건`
      : '';
    info.style.color = isFiltered ? 'var(--primary)' : '';
  }

  auctionPage = 1;
  renderAuctionTable();
}

/* 필터 초기화 */
function resetAuctionFilter() {
  ['af-item-type','af-region','af-status','af-floor-from','af-floor-to',
   'af-min-price-from','af-min-price-to',
   'af-official-from','af-official-to','af-building-from','af-building-to']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  applyAuctionFilter();
}

/* 금액 표시: 억/만 포맷 (경매용) */
function fmtWon(manWon) {
  if (manWon == null || isNaN(manWon)) return '-';
  const won = Math.round(manWon) * 10000;
  return won.toLocaleString() + '원';
}

function fmtAmt(val) {
  if (val == null || val === '') return '-';
  const n = parseInt(val, 10);
  if (isNaN(n) || n === 0) return '-';
  if (n >= 10000) {
    const 억 = Math.floor(n / 10000);
    const 만 = n % 10000;
    return 만 === 0 ? `${억}억` : `${억}억 ${만.toLocaleString()}만`;
  }
  return `${n.toLocaleString()}만`;
}

/* 차익 계산: 시세 - 최저가 (둘 다 있어야) */
function calcProfit(market, minPrice) {
  if (!market || !minPrice) return null;
  return parseInt(market, 10) - parseInt(minPrice, 10);
}

/* 상태 배지 클래스 */
function statusClass(status) {
  if (!status) return '';
  if (status === '낙찰')   return 'badge-won';
  if (status === '신건')   return 'badge-new';
  if (status === '진행중') return 'badge-active';
  return 'badge-neutral';
}

/* 시세 셀 HTML 생성 헬퍼 */
function marketCellHtml(id, field, val) {
  const display = val ? fmtAmt(val) : '<span class="waiting">대기</span>';
  return `<div class="market-cell" data-id="${id}" data-field="${field}">
    <span class="market-display">${display}</span>
    <svg class="edit-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  </div>`;
}

function profitCellClass(pft) {
  if (pft === null) return 'col-profit';
  return 'col-profit ' + (pft >= 0 ? 'profit-pos' : 'profit-neg');
}

function profitCellHtml(pft) {
  return pft !== null ? fmtAmt(pft) : '<span class="waiting">대기</span>';
}

function renderAuctionTable() {
  const tbody  = document.getElementById('auction-tbody');
  const badge  = document.getElementById('auction-badge');
  const selBtn = document.getElementById('auction-delete-sel-btn');
  const selAll = document.getElementById('auction-sel-all');

  const saveMyBtn = document.getElementById('auction-save-my-btn');
  badge.textContent    = auctionData.length + '건';
  selBtn.style.display   = auctionSelected.size > 0 ? '' : 'none';
  if (saveMyBtn) saveMyBtn.style.display = auctionSelected.size > 0 ? '' : 'none';

  if (!auctionData.length) {
    tbody.innerHTML = '<tr><td colspan="21" class="auction-empty">데이터가 없습니다. 엑셀 파일을 업로드하세요.</td></tr>';
    document.getElementById('auction-pagination').innerHTML = '';
    document.getElementById('auction-page-info').textContent = '';
    return;
  }
  if (!auctionFiltered.length) {
    tbody.innerHTML = '<tr><td colspan="21" class="auction-empty">조건에 맞는 데이터가 없습니다.</td></tr>';
    document.getElementById('auction-pagination').innerHTML = '';
    document.getElementById('auction-page-info').textContent = '';
    return;
  }

  // 현재 페이지 범위
  const total      = auctionFiltered.length;
  const totalPages = Math.ceil(total / auctionPageSize);
  if (auctionPage > totalPages) auctionPage = totalPages;
  const start    = (auctionPage - 1) * auctionPageSize;
  const end      = Math.min(start + auctionPageSize, total);
  const pageRows = auctionFiltered.slice(start, end);

  // 페이지 정보
  const pageInfo = document.getElementById('auction-page-info');
  if (pageInfo) pageInfo.textContent = `${start + 1}–${end} / 전체 ${total.toLocaleString()}건`;

  // selAll 상태
  if (selAll) {
    const pageSelected = pageRows.filter(r => auctionSelected.has(r.id)).length;
    selAll.indeterminate = pageSelected > 0 && pageSelected < pageRows.length;
    selAll.checked       = pageRows.length > 0 && pageSelected === pageRows.length;
  }

  tbody.innerHTML = pageRows.map(row => {
    const jeonsePft = calcProfit(row.jeonse_market, row.min_price);
    const salePft   = calcProfit(row.sale_market, row.min_price);
    const sc        = statusClass(row.status);
    return `<tr data-id="${row.id}" class="${auctionSelected.has(row.id) ? 'row-selected' : ''}">
      <td class="col-chk"><input type="checkbox" ${auctionSelected.has(row.id) ? 'checked' : ''} onchange="toggleAuctionRow(${row.id}, this.checked)"></td>
      <td class="col-seq">${row._seq ?? '-'}</td>
      <td class="col-case">${esc(row.case_no)}</td>
      <td class="col-type">${esc(row.item_type)}</td>
      <td class="col-region">${esc(row.region)}</td>
      <td class="col-date">${esc(row.bid_date)}</td>
      <td class="col-status"><span class="status-badge ${sc}">${esc(row.status) || '-'}</span></td>
      <td class="col-price">${fmtAmt(row.appraisal_price)}</td>
      <td class="col-price">${fmtAmt(row.winning_price)}</td>
      <td class="col-pct">${(row.winning_price && row.appraisal_price) ? (row.winning_price / row.appraisal_price * 100).toFixed(1) + '%' : '-'}</td>
      <td class="col-price">${fmtAmt(row.min_price)}</td>
      <td class="col-price">${fmtAmt(row.official_price)}</td>
      <td class="col-market">${marketCellHtml(row.id, 'jeonse_market', row.jeonse_market)}</td>
      <td class="${profitCellClass(jeonsePft)}">${profitCellHtml(jeonsePft)}</td>
      <td class="col-market">${marketCellHtml(row.id, 'sale_market', row.sale_market)}</td>
      <td class="${profitCellClass(salePft)}">${profitCellHtml(salePft)}</td>
      <td class="col-floor">${row.floor != null ? row.floor + '층' : '-'}</td>
      <td class="col-area">${row.building_area != null ? row.building_area : '-'}</td>
      <td class="col-area">${row.land_area != null ? row.land_area : '-'}</td>
      <td class="col-addr" title="${esc(row.address)}">${row.address ? `<a href="https://land.naver.com/search/index.naver?query=${encodeURIComponent(row.address)}" target="_blank" rel="noopener" class="naver-land-link" title="네이버 부동산">N</a> ` : ''}${esc(row.address)}</td>
      <td class="col-notes" title="${esc(row.notes)}">${esc(row.notes)}</td>
      <td class="col-del"><button class="btn-row-del" onclick="deleteOneAuction(${row.id})" title="삭제">✕</button></td>
    </tr>`;
  }).join('');

  // market-cell 클릭 이벤트 위임 (tbody 단 1개만 등록)
  tbody.onclick = e => {
    const cell = e.target.closest('.market-cell');
    if (cell) startEditMarket(cell);
  };

  renderAuctionPagination(totalPages);
}

function renderAuctionPagination(totalPages) {
  const el = document.getElementById('auction-pagination');
  if (!el) return;
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  const p = auctionPage;
  const btn = (label, page, disabled, active) =>
    `<button class="page-btn${active ? ' active' : ''}" ${disabled ? 'disabled' : `onclick="changeAuctionPage(${page})"`}>${label}</button>`;

  let html = btn('«', 1, p === 1, false) + btn('‹', p - 1, p === 1, false);

  const range = 2;
  const pages = new Set([1, totalPages]);
  for (let i = Math.max(1, p - range); i <= Math.min(totalPages, p + range); i++) pages.add(i);
  const sorted = [...pages].sort((a, b) => a - b);

  let prev = 0;
  sorted.forEach(pg => {
    if (prev && pg - prev > 1) html += `<span class="page-ellipsis">…</span>`;
    html += btn(pg, pg, false, pg === p);
    prev = pg;
  });

  html += btn('›', p + 1, p === totalPages, false) + btn('»', totalPages, p === totalPages, false);
  el.innerHTML = html;
}

function changeAuctionPage(page) {
  auctionPage = page;
  renderAuctionTable();
  document.getElementById('auction-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function changeAuctionPageSize() {
  auctionPageSize = parseInt(document.getElementById('auction-page-size').value, 10);
  auctionPage = 1;
  renderAuctionTable();
}

/* 해당 행의 시세·차익 셀만 DOM 업데이트 (전체 재렌더 없음) */
function refreshAuctionRow(id) {
  const row = auctionData.find(r => r.id === id);
  if (!row) return;
  const tr = document.querySelector(`#auction-tbody tr[data-id="${id}"]`);
  if (!tr) return;

  const jeonsePft = calcProfit(row.jeonse_market, row.min_price);
  const salePft   = calcProfit(row.sale_market, row.min_price);
  const cells     = tr.querySelectorAll('td');

  // col 순서: 0체크, 1순번, 2사건번호, 3종류, 4지역, 5입찰일, 6상태, 7감정가, 8낙찰가, 9낙찰률, 10최저가, 11공시
  // 12전세시세, 13전세차익, 14매매시세, 15매매차익
  cells[12].innerHTML = marketCellHtml(row.id, 'jeonse_market', row.jeonse_market);
  cells[13].className = profitCellClass(jeonsePft);
  cells[13].innerHTML = profitCellHtml(jeonsePft);
  cells[14].innerHTML = marketCellHtml(row.id, 'sale_market', row.sale_market);
  cells[15].className = profitCellClass(salePft);
  cells[15].innerHTML = profitCellHtml(salePft);
}

function esc(v) {
  if (v == null) return '-';
  return v.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* 인라인 편집: 시세 셀 클릭 → input 전환 */
function startEditMarket(cell) {
  if (cell.querySelector('input')) return;

  const id      = parseInt(cell.dataset.id, 10);
  const field   = cell.dataset.field;
  const rowData = auctionData.find(r => r.id === id);
  const curVal  = rowData ? rowData[field] : null;

  const display = cell.querySelector('.market-display');
  const icon    = cell.querySelector('.edit-icon');
  display.style.display = 'none';
  if (icon) icon.style.display = 'none';

  const input = document.createElement('input');
  input.type        = 'number';
  input.className   = 'market-input';
  input.placeholder = '만원 단위';
  input.value       = curVal ?? '';
  cell.appendChild(input);
  input.focus();
  input.select();

  const save = async () => {
    const val = input.value.trim() === '' ? null : parseInt(input.value, 10);
    input.remove();
    display.style.display = '';
    if (icon) icon.style.display = '';

    try {
      const res = await fetch(`/api/auction/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ [field]: val }),
      });
      if (!res.ok) throw new Error((await res.json()).error || '저장 실패');
      if (rowData) rowData[field] = val;
      refreshAuctionRow(id);   // 해당 행만 업데이트
    } catch (e) {
      showToast('저장 실패: ' + e.message, 'error');
    }
  };

  input.addEventListener('blur', save);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { input.blur(); }
    if (e.key === 'Escape') {
      input.removeEventListener('blur', save);
      input.remove();
      display.style.display = '';
      if (icon) icon.style.display = '';
    }
  });
}

/* 체크박스: 해당 행 class만 토글 (전체 재렌더 없음) */
function toggleAuctionRow(id, checked) {
  if (checked) auctionSelected.add(id);
  else auctionSelected.delete(id);

  const tr = document.querySelector(`#auction-tbody tr[data-id="${id}"]`);
  if (tr) tr.classList.toggle('row-selected', checked);

  const selAll = document.getElementById('auction-sel-all');
  const selBtn    = document.getElementById('auction-delete-sel-btn');
  const saveMyBtn = document.getElementById('auction-save-my-btn');
  const filteredSelected = auctionFiltered.filter(r => auctionSelected.has(r.id)).length;
  if (selAll) selAll.indeterminate = filteredSelected > 0 && filteredSelected < auctionFiltered.length;
  if (selAll) selAll.checked = auctionFiltered.length > 0 && filteredSelected === auctionFiltered.length;
  if (selBtn)    selBtn.style.display    = auctionSelected.size > 0 ? '' : 'none';
  if (saveMyBtn) saveMyBtn.style.display = auctionSelected.size > 0 ? '' : 'none';
}

function toggleAuctionSelAll(checked) {
  const start    = (auctionPage - 1) * auctionPageSize;
  const pageRows = auctionFiltered.slice(start, start + auctionPageSize);
  if (checked) pageRows.forEach(r => auctionSelected.add(r.id));
  else         pageRows.forEach(r => auctionSelected.delete(r.id));

  document.querySelectorAll('#auction-tbody tr[data-id]').forEach(tr => {
    tr.classList.toggle('row-selected', checked);
    const chk = tr.querySelector('input[type="checkbox"]');
    if (chk) chk.checked = checked;
  });

  const selBtn    = document.getElementById('auction-delete-sel-btn');
  const saveMyBtn = document.getElementById('auction-save-my-btn');
  if (selBtn)    selBtn.style.display    = auctionSelected.size > 0 ? '' : 'none';
  if (saveMyBtn) saveMyBtn.style.display = auctionSelected.size > 0 ? '' : 'none';
}

/* 삭제 */
async function deleteOneAuction(id) {
  if (!confirm('이 항목을 삭제하겠습니까?')) return;
  try {
    await fetch(`/api/auction/${id}`, { method: 'DELETE' });
    auctionData     = auctionData.filter(r => r.id !== id);
    auctionFiltered = auctionFiltered.filter(r => r.id !== id);
    auctionSelected.delete(id);
    renderAuctionTable();
    showToast('삭제했습니다.');
  } catch (e) {
    showToast('삭제 실패: ' + e.message, 'error');
  }
}

async function deleteSelectedAuctions() {
  if (!auctionSelected.size) return;
  if (!confirm(`선택한 ${auctionSelected.size}건을 삭제하겠습니까?`)) return;
  try {
    await fetch('/api/auction/batch', {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ids: [...auctionSelected] }),
    });
    auctionData     = auctionData.filter(r => !auctionSelected.has(r.id));
    auctionFiltered = auctionFiltered.filter(r => !auctionSelected.has(r.id));
    auctionSelected.clear();
    renderAuctionTable();
    showToast('선택 항목을 삭제했습니다.');
  } catch (e) {
    showToast('삭제 실패: ' + e.message, 'error');
  }
}

async function deleteAllAuctions() {
  if (!auctionData.length) return;
  if (!confirm('전체 경매 데이터를 삭제하겠습니까?')) return;
  try {
    const res  = await fetch('/api/auction/all', { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `서버 오류 (${res.status})`);
    auctionData     = [];
    auctionFiltered = [];
    auctionSelected.clear();
    renderAuctionTable();
    showToast('전체 삭제했습니다.');
  } catch (e) {
    showToast('삭제 실패: ' + e.message, 'error');
  }
}

/* 엑셀 다운로드 */
function downloadAuctionExcel() {
  const data = auctionFiltered.length ? auctionFiltered : auctionData;
  if (!data.length) { showToast('다운로드할 데이터가 없습니다.', 'error'); return; }

  const headers = [
    '순번', '경매사건번호', '물건종류', '지역', '입찰일', '상태',
    '감정가(만원)', '낙찰가(만원)', '최저가(만원)', '공시(만원)',
    '전세시세(만원)', '전세차익(만원)', '매매시세(만원)', '매매차익(만원)',
    '층수', '건물평수', '대지평수', '주소', '체크사항',
  ];

  const rows = data.map(r => {
    const jeonsePft = calcProfit(r.jeonse_market, r.min_price);
    const salePft   = calcProfit(r.sale_market,   r.min_price);
    return [
      r._seq          ?? '',
      r.case_no       ?? '',
      r.item_type     ?? '',
      r.region        ?? '',
      r.bid_date      ?? '',
      r.status        ?? '',
      r.appraisal_price ?? '',
      r.winning_price   ?? '',
      r.min_price       ?? '',
      r.official_price  ?? '',
      r.jeonse_market   ?? '',
      jeonsePft         ?? '',
      r.sale_market     ?? '',
      salePft           ?? '',
      r.floor           ?? '',
      r.building_area   ?? '',
      r.land_area       ?? '',
      r.address         ?? '',
      r.notes           ?? '',
    ];
  });

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // 열 너비 설정
  ws['!cols'] = [
    { wch: 6 }, { wch: 18 }, { wch: 10 }, { wch: 8 }, { wch: 12 }, { wch: 8 },
    { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 },
    { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 },
    { wch: 6 }, { wch: 10 }, { wch: 10 }, { wch: 30 }, { wch: 20 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '경매목록');

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const isFiltered = auctionFiltered.length !== auctionData.length;
  XLSX.writeFile(wb, `부동산경매_${isFiltered ? '필터' : '전체'}_${today}.xlsx`);
  showToast(`${data.length.toLocaleString()}건 다운로드 완료`);
}

/* 엑셀 업로드 – 브라우저에서 XLSX 파싱 후 JSON으로 전송 (Vercel 4.5 MB 제한 우회) */
async function handleAuctionUpload(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = '';

  /* ── 파일명 검증: "물건추천 - "으로 시작해야 함 ── */
  if (!file.name.startsWith('물건추천 - ')) {
    showToast('양식 파일이 아닙니다. 파일명이 "물건추천 - "으로 시작해야 합니다.', 'error');
    return;
  }

  setLoading(true);
  try {
    /* ── 1. 파일 파싱 ── */
    const arrayBuf  = await file.arrayBuffer();
    const wb        = XLSX.read(arrayBuf, { type: 'array', cellDates: false });
    const sheetName = wb.SheetNames.find(n => n === '경매목록') || wb.SheetNames[0];
    if (!sheetName) throw new Error('Excel 시트를 찾을 수 없습니다.');

    const ws  = wb.Sheets[sheetName];
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

    /* ── 2. 헤더 행 탐지 ── */
    const hIdx = raw.findIndex(row =>
      Array.isArray(row) && row.some(v => v && v.toString().trim() === '순번')
    );
    if (hIdx === -1) throw new Error('헤더 행(순번 컬럼)을 찾을 수 없습니다.');

    const headers     = raw[hIdx].map(h => h != null ? h.toString().trim() : null);
    const headerToIdx = {};
    headers.forEach((h, i) => { if (h) headerToIdx[h] = i; });

    const dataRows = raw.slice(hIdx + 1).filter(r =>
      Array.isArray(r) && r.some(v => v !== null && v !== undefined && v !== '')
    );
    if (!dataRows.length) throw new Error('데이터가 없습니다.');

    /* ── 3. 행 객체 변환 ── */
    const rowObjects = dataRows.map(row => {
      const obj = {};
      Object.entries(headerToIdx).forEach(([key, idx]) => {
        obj[key] = row[idx] !== undefined ? row[idx] : null;
      });
      return obj;
    });

    /* ── 4. 파싱 헬퍼 ── */
    const g = (row, ...keys) => {
      for (const k of keys) {
        const v = row[k];
        if (v !== null && v !== undefined && v !== '') return v;
      }
      return null;
    };
    // 금액: 컬럼명에 '만원' 포함 시 이미 만원, 아니면 원→만원(÷10000)
    const parseAmt = (row, ...keys) => {
      for (const k of keys) {
        const v = row[k];
        if (v !== null && v !== undefined && v !== '') {
          const n = parseFloat(v.toString().replace(/[,\s]/g, ''));
          if (isNaN(n)) return null;
          return k.includes('만원') ? Math.round(n) : Math.round(n / 10000);
        }
      }
      return null;
    };
    const parsePyeong = v => {
      if (v == null) return null;
      const s = v.toString();
      const m = s.match(/\(([0-9.]+)평\)/);
      if (m) return parseFloat(m[1]) || null;
      const n = parseFloat(s);
      return isNaN(n) ? null : n;
    };
    const parseDateVal = v => {
      if (v == null || v === '') return null;
      if (typeof v === 'number') {
        const d = XLSX.SSF.parse_date_code(v);
        if (d) return `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`;
      }
      return v.toString().trim() || null;
    };
    const parseFloorAddr = addr => {
      if (!addr) return null;
      const s   = addr.toString();
      const bm  = s.match(/(?:B|지하|지)\s*(\d+)\s*층/i);
      if (bm) return -parseInt(bm[1], 10);
      const mm  = s.match(/(\d{1,3})\s*층/);
      return mm ? parseInt(mm[1], 10) : null;
    };

    /* ── 5. auction 필드 매핑 ── */
    const rows = rowObjects.map(row => ({
      case_no:         (g(row,'경매사건번호') || '').toString().trim() || null,
      item_type:       (g(row,'물건종류')     || '').toString().trim() || null,
      region:          (g(row,'지역')         || '').toString().trim() || null,
      bid_date:        parseDateVal(g(row,'입찰일')),
      status:          (() => { const s=(g(row,'상태')||'').toString().trim(); return s==='진행'?'진행중':s||null; })(),
      appraisal_price: parseAmt(row,'감정가','감정가(만원)'),
      winning_price:   parseAmt(row,'낙찰가','낙찰가(만원)'),
      min_price:       parseAmt(row,'최저가','최저가(만원)'),
      official_price:  parseAmt(row,'공시','공시(만원)'),
      jeonse_market:   parseAmt(row,'전세 시세','전세시세','전세 시세(만원)'),
      sale_market:     parseAmt(row,'매매 시세','매매시세','매매 시세(만원)'),
      building_area:   parsePyeong(g(row,'건물평수')),
      land_area:       parsePyeong(g(row,'대지평수')),
      address:         (g(row,'주소') || '').toString().trim() || null,
      floor:           parseFloorAddr((g(row,'주소') || '').toString()),
      notes:           (g(row,'체크사항') || '').toString().trim() || null,
    })).filter(r => r.case_no);

    if (!rows.length) throw new Error('유효한 데이터 행이 없습니다. 경매사건번호 컬럼을 확인하세요.');

    /* ── 6. "낙찰 된것" 시트에서 wonMap 추출 (case_no → winning_price 만원) ── */
    const wonMap = {};
    let wonSheetCaseNos = []; // 낙찰 된것 시트에 있는 모든 case_no
    let wonSheetExists  = false;
    try {
      const wonSheetName = wb.SheetNames.find(n => n.includes('낙찰'));
      if (wonSheetName) {
        wonSheetExists = true;
        const wonWs  = wb.Sheets[wonSheetName];
        // !ref 범위를 최대 30컬럼으로 제한 → 수백 개의 null 컬럼 파싱 방지
        if (wonWs['!ref']) {
          const r = XLSX.utils.decode_range(wonWs['!ref']);
          wonWs['!ref'] = XLSX.utils.encode_range({ s: r.s, e: { r: r.e.r, c: Math.min(r.e.c, 30) } });
        }
        const wonRaw = XLSX.utils.sheet_to_json(wonWs, { header: 1, defval: null });
        const wonHIdx = wonRaw.findIndex(row =>
          Array.isArray(row) && row.some(v => v && (v.toString().trim() === '순번' || v.toString().trim() === '경매사건번호'))
        );
        if (wonHIdx !== -1) {
          const wonHeaders     = wonRaw[wonHIdx].map(h => h != null ? h.toString().trim() : null);
          const wonHeaderToIdx = {};
          wonHeaders.forEach((h, i) => { if (h) wonHeaderToIdx[h] = i; });
          const cnoIdx = wonHeaderToIdx['경매사건번호'];
          const wpKey  = wonHeaders.find(h => h && h.includes('낙찰가'));
          const wpIdx  = wpKey != null ? wonHeaderToIdx[wpKey] : -1;
          const wonCaseNosSet = new Set();
          wonRaw.slice(wonHIdx + 1)
            .filter(r => Array.isArray(r) && r.some(v => v !== null && v !== undefined && v !== ''))
            .forEach(row => {
              const cno = cnoIdx != null && row[cnoIdx] != null ? row[cnoIdx].toString().trim() : null;
              if (cno) wonCaseNosSet.add(cno);
              if (!cno || wpIdx === -1) return;
              const raw = row[wpIdx];
              if (raw == null || raw === '') return;
              const n = parseFloat(raw.toString().replace(/[,\s]/g, ''));
              if (!isNaN(n)) wonMap[cno] = wpKey.includes('만원') ? Math.round(n) : Math.round(n / 10000);
            });
          wonSheetCaseNos = [...wonCaseNosSet];
        }
      }
    } catch (wonErr) {
      console.warn('낙찰 된것 시트 파싱 오류 (무시됨):', wonErr.message);
    }

    const postJSON = (url, body) => fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(async r => { const d = await r.json().catch(() => ({})); if (!r.ok || !d.success) throw new Error([d.error, d.details, d.hint].filter(Boolean).join(' | ') || `서버 오류 (${r.status})`); return d; });

    /* ── 7. 1단계: case_no 목록만 전송 → 낙찰/변경 처리 (~55KB) ── */
    const caseNos = rows.map(r => r.case_no).filter(Boolean);
    const phase1  = await postJSON('/api/auction/mark-won', { caseNos, wonSheetCaseNos, wonSheetExists });
    const wonCaseNos      = phase1.wonCaseNos      || [];
    const changedCaseNos  = phase1.changedCaseNos  || [];
    const existingCaseNos = phase1.existingCaseNos || [];

    /* ── 8. 2단계: rows를 400건씩 배치 전송 ── */
    const BATCH = 400;
    let totalUpserted = 0, totalNew = 0;
    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH);
      const r = await postJSON('/api/auction/upsert-rows', { rows: batch, existingCaseNos });
      totalUpserted += r.upserted || 0;
      totalNew      += r.markedAsNew || 0;
    }

    /* ── 9. 낙찰된 항목 winning_price 업데이트 ── */
    if (wonCaseNos.length > 0 && Object.keys(wonMap).length > 0) {
      const prices = {};
      wonCaseNos.forEach(cno => { if (wonMap[cno] != null) prices[cno] = wonMap[cno]; });
      if (Object.keys(prices).length > 0) {
        await postJSON('/api/auction/won-prices', { prices });
      }
    }

    const parts = [`진행중 ${totalUpserted - totalNew}건`];
    if (totalNew > 0)              parts.push(`신건 ${totalNew}건`);
    if (wonCaseNos.length > 0)     parts.push(`낙찰 ${wonCaseNos.length}건`);
    if (changedCaseNos.length > 0) parts.push(`변경/낙찰 ${changedCaseNos.length}건`);
    showToast(parts.join(', ') + ' 처리완료', 'success');
    await loadAuctions();
  } catch (e) {
    showToast('업로드 오류: ' + e.message, 'error');
  } finally {
    setLoading(false);
  }
}

/* ═══════════════════════════════════════════════════════
   나만의 경매물건
═══════════════════════════════════════════════════════ */
let myAuctionData     = [];
let myAuctionFiltered = [];
let myAuctionSelected = new Set();
let myAuctionPage     = 1;
let myAuctionPageSize = 30;

/* 경매 뷰에서 선택한 항목 저장 */
async function saveToMyAuction() {
  if (auctionSelected.size === 0) return;
  const items = auctionData.filter(r => auctionSelected.has(r.id));
  if (!confirm(`선택한 ${items.length}건을 나만의 경매물건으로 저장하겠습니까?`)) return;

  try {
    const res  = await fetch('/api/my-auction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || '저장 실패');
    showToast(`${data.count}건 저장 완료`, 'success');
  } catch (e) {
    showToast('저장 오류: ' + e.message, 'error');
  }
}

/* 로드 */
async function loadMyAuctions() {
  try {
    const res  = await fetch('/api/my-auction');
    myAuctionData = await res.json();
    if (!Array.isArray(myAuctionData)) myAuctionData = [];
  } catch (_) {
    myAuctionData = [];
  }
  myAuctionData.forEach((r, i) => { r._seq = i + 1; });
  myAuctionSelected.clear();
  applyMyAuctionFilter();
}

/* 필터 */
function applyMyAuctionFilter() {
  const status  = document.getElementById('maf-status')?.value   || '';
  const bidFrom = document.getElementById('maf-bid-from')?.value || '';
  const bidTo   = document.getElementById('maf-bid-to')?.value   || '';

  myAuctionFiltered = myAuctionData.filter(r => {
    if (status && r.my_status !== status) return false;
    const d = r.my_bid_date || r.bid_date || '';
    if (bidFrom && (!d || d < bidFrom)) return false;
    if (bidTo   && (!d || d > bidTo))   return false;
    return true;
  });

  const info = document.getElementById('maf-result-count');
  if (info) {
    const isFiltered = myAuctionFiltered.length !== myAuctionData.length;
    info.textContent = isFiltered
      ? `${myAuctionFiltered.length.toLocaleString()}건 표시 / 전체 ${myAuctionData.length.toLocaleString()}건` : '';
  }

  myAuctionPage = 1;
  renderMyAuctionTable();
}

function resetMyAuctionFilter() {
  ['maf-status', 'maf-bid-from', 'maf-bid-to'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  applyMyAuctionFilter();
}

/* 렌더 */
function renderMyAuctionTable() {
  const tbody  = document.getElementById('my-auction-tbody');
  const badge  = document.getElementById('my-auction-badge');
  const selBtn = document.getElementById('my-auction-delete-sel-btn');
  const selAll = document.getElementById('my-auction-sel-all');
  if (!tbody) return;

  const total      = myAuctionFiltered.length;
  const totalPages = Math.max(1, Math.ceil(total / myAuctionPageSize));
  myAuctionPage    = Math.min(myAuctionPage, totalPages);
  const start      = (myAuctionPage - 1) * myAuctionPageSize;
  const end        = Math.min(start + myAuctionPageSize, total);
  const pageRows   = myAuctionFiltered.slice(start, end);

  if (badge)  badge.textContent    = myAuctionData.length + '건';
  if (selBtn) selBtn.style.display = myAuctionSelected.size > 0 ? '' : 'none';

  const pageInfo = document.getElementById('my-auction-page-info');
  if (pageInfo) pageInfo.textContent = total > 0
    ? `${start + 1}–${end} / 전체 ${total.toLocaleString()}건` : '0건';

  if (selAll) {
    const pgSel = pageRows.filter(r => myAuctionSelected.has(r.id)).length;
    selAll.indeterminate = pgSel > 0 && pgSel < pageRows.length;
    selAll.checked       = pageRows.length > 0 && pgSel === pageRows.length;
  }

  if (total === 0) {
    tbody.innerHTML = '<tr><td colspan="23" class="auction-empty">저장된 데이터가 없습니다.</td></tr>';
    renderMyAuctionPagination(1);
    return;
  }

  tbody.innerHTML = pageRows.map(row => {
    const sc = row.my_status === '낙찰' ? 'badge-won' : 'badge-active';
    const savedDate = row.saved_at ? row.saved_at.slice(0, 10) : '-';
    return `<tr data-id="${row.id}" class="${myAuctionSelected.has(row.id) ? 'row-selected' : ''}">
      <td class="col-chk"><input type="checkbox" ${myAuctionSelected.has(row.id) ? 'checked' : ''} onchange="toggleMyAuctionRow(${row.id}, this.checked)"></td>
      <td class="col-seq">${row._seq}</td>
      <td class="col-action"><button class="btn-profit-sm" onclick="openProfitModal(${row.id})" title="수익률 분석">📊</button></td>
      <td class="col-case">${esc(row.case_no)}</td>
      <td class="col-type">${esc(row.item_type)}</td>
      <td class="col-region">${esc(row.region)}</td>
      <td class="col-date my-editable" data-id="${row.id}" data-field="my_bid_date" data-val="${row.my_bid_date || ''}">${row.my_bid_date || '-'}</td>
      <td class="col-status my-editable" data-id="${row.id}" data-field="my_status" data-val="${row.my_status || '진행중'}"><span class="status-badge ${sc}">${esc(row.my_status) || '진행중'}</span></td>
      <td class="col-price">${fmtAmt(row.appraisal_price)}</td>
      <td class="col-price my-editable" data-id="${row.id}" data-field="winning_price" data-val="${row.winning_price ?? ''}">${fmtAmt(row.winning_price)}</td>
      <td class="col-pct">${(row.winning_price && row.appraisal_price) ? (row.winning_price / row.appraisal_price * 100).toFixed(1) + '%' : '-'}</td>
      <td class="col-price my-editable" data-id="${row.id}" data-field="min_price" data-val="${row.min_price ?? ''}">${fmtAmt(row.min_price)}</td>
      <td class="col-price">${fmtAmt(row.official_price)}</td>
      <td class="col-market my-editable" data-id="${row.id}" data-field="jeonse_market" data-val="${row.jeonse_market ?? ''}">${fmtAmt(row.jeonse_market)}</td>
      <td class="${profitCellClass(calcProfit(row.jeonse_market, row.min_price))}">${profitCellHtml(calcProfit(row.jeonse_market, row.min_price))}</td>
      <td class="col-market my-editable" data-id="${row.id}" data-field="sale_market" data-val="${row.sale_market ?? ''}">${fmtAmt(row.sale_market)}</td>
      <td class="${profitCellClass(calcProfit(row.sale_market, row.min_price))}">${profitCellHtml(calcProfit(row.sale_market, row.min_price))}</td>
      <td class="col-floor">${row.floor != null ? row.floor + '층' : '-'}</td>
      <td class="col-area">${row.building_area != null ? row.building_area : '-'}</td>
      <td class="col-addr" title="${esc(row.address)}">${row.address ? `<a href="https://land.naver.com/search/index.naver?query=${encodeURIComponent(row.address)}" target="_blank" rel="noopener" class="naver-land-link" title="네이버 부동산">N</a> ` : ''}${esc(row.address)}</td>
      <td class="col-notes my-editable" data-id="${row.id}" data-field="check_notes" data-val="${esc(row.check_notes || '')}" title="${esc(row.check_notes)}">${esc(row.check_notes) || '-'}</td>
      <td class="col-date">${savedDate}</td>
      <td class="col-del"><button class="btn-row-del" onclick="deleteOneMyAuction(${row.id})" title="삭제">✕</button></td>
    </tr>`;
  }).join('');

  tbody.onclick = e => {
    const cell = e.target.closest('.my-editable');
    if (cell && !cell.querySelector('input, select')) startEditMyCell(cell);
  };

  renderMyAuctionPagination(totalPages);
}

/* 인라인 편집 */
function startEditMyCell(cell) {
  const id    = parseInt(cell.dataset.id, 10);
  const field = cell.dataset.field;
  const val   = cell.dataset.val;
  let input;

  if (field === 'my_status') {
    input = document.createElement('select');
    input.className = 'my-cell-input';
    input.innerHTML = '<option value="진행중">진행중</option><option value="낙찰">낙찰</option>';
    input.value = val || '진행중';
  } else if (field === 'my_bid_date') {
    input = document.createElement('input');
    input.type = 'date';
    input.className = 'my-cell-input';
    input.value = val || '';
  } else if (field === 'winning_price' || field === 'min_price' || field === 'jeonse_market' || field === 'sale_market') {
    input = document.createElement('input');
    input.type = 'number';
    input.className = 'my-cell-input';
    input.placeholder = '만원';
    input.value = val !== '' ? val : '';
    input.min = '0';
  } else {
    input = document.createElement('input');
    input.type = 'text';
    input.className = 'my-cell-input';
    input.value = val || '';
    input.placeholder = '체크사항 입력';
  }

  cell.innerHTML = '';
  cell.appendChild(input);
  input.focus();

  const save = async () => {
    const newVal = input.value.trim();
    const body = {};
    if (field === 'winning_price' || field === 'min_price' || field === 'jeonse_market' || field === 'sale_market') {
      body[field] = newVal !== '' ? parseFloat(newVal) : null;
    } else {
      body[field] = newVal !== '' ? newVal : null;
    }
    try {
      await fetch(`/api/my-auction/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const row = myAuctionData.find(r => r.id === id);
      if (row) row[field] = body[field];
      // 수익률분석 모달이 같은 물건을 보고 있으면 매도금액 동기화
      if (field === 'sale_market' && profitItem && profitItem.id === id) {
        profitItem.sale_market = body[field];
        const saleEl = document.getElementById('pf-sale-price');
        if (saleEl) {
          if (body[field] != null) setWonInput('pf-sale-price', body[field]);
          else { saleEl.value = ''; saleEl.dataset.raw = ''; }
          calcProfitAll();
        }
      }
    } catch (_) {}
    renderMyAuctionTable();
  };

  input.addEventListener('blur', save);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { renderMyAuctionTable(); }
  });
  if (field === 'my_status') input.addEventListener('change', () => input.blur());
}

/* 페이지네이션 */
function renderMyAuctionPagination(totalPages) {
  const el = document.getElementById('my-auction-pagination');
  if (!el) return;
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  const p   = myAuctionPage;
  const btn = (label, page, disabled, active) =>
    `<button class="page-btn${active ? ' active' : ''}" ${disabled ? 'disabled' : `onclick="changeMyAuctionPage(${page})"`}>${label}</button>`;

  let html = btn('«', 1, p === 1, false) + btn('‹', p - 1, p === 1, false);
  const range = 2;
  const pages = new Set([1, totalPages]);
  for (let i = Math.max(1, p - range); i <= Math.min(totalPages, p + range); i++) pages.add(i);
  const sorted = [...pages].sort((a, b) => a - b);
  let prev = 0;
  sorted.forEach(pg => {
    if (prev && pg - prev > 1) html += `<span class="page-ellipsis">…</span>`;
    html += btn(pg, pg, false, pg === p);
    prev = pg;
  });
  html += btn('›', p + 1, p === totalPages, false) + btn('»', totalPages, p === totalPages, false);
  el.innerHTML = html;
}

function changeMyAuctionPage(page) {
  myAuctionPage = page;
  renderMyAuctionTable();
  document.getElementById('my-auction-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function changeMyAuctionPageSize() {
  myAuctionPageSize = parseInt(document.getElementById('my-auction-page-size').value, 10);
  myAuctionPage = 1;
  renderMyAuctionTable();
}

/* 선택 */
function toggleMyAuctionRow(id, checked) {
  if (checked) myAuctionSelected.add(id);
  else myAuctionSelected.delete(id);

  const tr = document.querySelector(`#my-auction-tbody tr[data-id="${id}"]`);
  if (tr) tr.classList.toggle('row-selected', checked);

  const selAll = document.getElementById('my-auction-sel-all');
  const selBtn = document.getElementById('my-auction-delete-sel-btn');
  const pgSel  = myAuctionFiltered.filter(r => myAuctionSelected.has(r.id)).length;
  if (selAll) selAll.indeterminate = pgSel > 0 && pgSel < myAuctionFiltered.length;
  if (selAll) selAll.checked = myAuctionFiltered.length > 0 && pgSel === myAuctionFiltered.length;
  if (selBtn) selBtn.style.display = myAuctionSelected.size > 0 ? '' : 'none';
}

function toggleMyAuctionSelAll(checked) {
  const start    = (myAuctionPage - 1) * myAuctionPageSize;
  const pageRows = myAuctionFiltered.slice(start, start + myAuctionPageSize);
  if (checked) pageRows.forEach(r => myAuctionSelected.add(r.id));
  else         pageRows.forEach(r => myAuctionSelected.delete(r.id));

  document.querySelectorAll('#my-auction-tbody tr[data-id]').forEach(tr => {
    tr.classList.toggle('row-selected', checked);
    const chk = tr.querySelector('input[type="checkbox"]');
    if (chk) chk.checked = checked;
  });

  const selBtn = document.getElementById('my-auction-delete-sel-btn');
  if (selBtn) selBtn.style.display = myAuctionSelected.size > 0 ? '' : 'none';
}

/* 삭제 */
async function deleteOneMyAuction(id) {
  if (!confirm('이 항목을 삭제하겠습니까?')) return;
  try {
    await fetch(`/api/my-auction/${id}`, { method: 'DELETE' });
    myAuctionData     = myAuctionData.filter(r => r.id !== id);
    myAuctionFiltered = myAuctionFiltered.filter(r => r.id !== id);
    myAuctionSelected.delete(id);
    myAuctionData.forEach((r, i) => { r._seq = i + 1; });
    renderMyAuctionTable();
    showToast('삭제 완료');
  } catch (e) { showToast('삭제 실패: ' + e.message, 'error'); }
}

async function deleteSelectedMyAuctions() {
  if (myAuctionSelected.size === 0) return;
  if (!confirm(`선택한 ${myAuctionSelected.size}건을 삭제하겠습니까?`)) return;
  const ids = [...myAuctionSelected];
  try {
    await fetch('/api/my-auction/batch', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    myAuctionData     = myAuctionData.filter(r => !myAuctionSelected.has(r.id));
    myAuctionFiltered = myAuctionFiltered.filter(r => !myAuctionSelected.has(r.id));
    myAuctionSelected.clear();
    myAuctionData.forEach((r, i) => { r._seq = i + 1; });
    renderMyAuctionTable();
    showToast('삭제 완료');
  } catch (e) { showToast('삭제 실패: ' + e.message, 'error'); }
}

/* 엑셀 다운로드 */
function downloadMyAuctionExcel() {
  const data = myAuctionFiltered.length !== myAuctionData.length ? myAuctionFiltered : myAuctionData;
  if (!data.length) { showToast('다운로드할 데이터가 없습니다.', 'error'); return; }

  const rows = data.map(r => ({
    '순번':           r._seq,
    '경매사건번호':   r.case_no || '',
    '물건종류':       r.item_type || '',
    '지역':           r.region || '',
    '입찰일':         r.my_bid_date || r.bid_date || '',
    '상태':           r.my_status || '',
    '감정가(만원)':   r.appraisal_price ?? '',
    '낙찰가(만원)':   r.winning_price ?? '',
    '최저가(만원)':   r.min_price ?? '',
    '공시가(만원)':   r.official_price ?? '',
    '전세시세(만원)': r.jeonse_market ?? '',
    '전세차익(만원)': calcProfit(r.jeonse_market, r.min_price) ?? '',
    '매매시세(만원)': r.sale_market ?? '',
    '매매차익(만원)': calcProfit(r.sale_market, r.min_price) ?? '',
    '층수':           r.floor != null ? r.floor : '',
    '건물평수':       r.building_area ?? '',
    '주소':           r.address || '',
    '체크사항':     r.check_notes || '',
    '저장일':       r.saved_at ? r.saved_at.slice(0, 10) : '',
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '나만의경매물건');
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const isFiltered = myAuctionFiltered.length !== myAuctionData.length;
  XLSX.writeFile(wb, `나만의경매물건_${isFiltered ? '필터' : '전체'}_${today}.xlsx`);
  showToast(`${data.length.toLocaleString()}건 다운로드 완료`);
}

/* ═══════════════════════════════════════════════════════
   네이버부동산 호가 분석
═══════════════════════════════════════════════════════ */

function parseNaverBlock(rawLines) {
  // 빈 줄 제거
  const lines = rawLines.map(l => l.trim()).filter(l => l);
  if (lines.length < 7) return null;

  const n = lines.length;
  // 고정 위치 (끝에서부터)
  const dateLine  = lines[n - 1]; // 확인매물 YY.MM.DD.
  const agent     = lines[n - 2]; // 공인중개사명
  // const src    = lines[n - 3]; // 제공처 (표시 생략)
  const tagLine   = lines[n - 4]; // 25년이상소형평수...
  const detail    = lines[2];     // 면적/층/향
  const priceLine = lines[1];     // 매매/전세/월세 + 가격
  const nameLine  = lines[0];     // 매물명

  // 자랑거리: index 3 ~ n-5 사이 (없으면 빈 배열)
  const highlight = lines.slice(3, n - 4).join(' ').trim();

  // 매물명 / 구분
  let ownerType = '', name = nameLine;
  if (nameLine.startsWith('현장'))   { ownerType = '현장';   name = nameLine.slice(2); }
  else if (nameLine.startsWith('집주인')) { ownerType = '집주인'; name = nameLine.slice(3); }

  // 주거종류가 빌라/연립 뿐이면 이름을 빈칸으로
  const GENERIC = /^(빌라|연립|아파트|오피스텔|단독)$/;
  if (GENERIC.test(name)) name = '';

  // 가격 라인 파싱
  let dealType = '', price = '';
  const priceM = priceLine.match(/^(매매|전세|월세)(.*)/);
  if (priceM) { dealType = priceM[1]; price = priceM[2].trim(); }

  // 면적/층/향 라인 파싱
  // 형식: [주거종류][공급]/[전용]m², [해당층]/[전체층]층, [향]
  let houseType = '', supplyArea = '', exclArea = '', floorCur = '', floorTotal = '', direction = '';
  if (detail) {
    const htM = detail.match(/^(다세대|빌라|연립|아파트|오피스텔)/);
    if (htM) houseType = htM[1];

    const areaM = detail.match(/([\d.]+|-)\/([\d.]+)m²/);
    if (areaM) { supplyArea = areaM[1]; exclArea = areaM[2]; }

    const floorM = detail.match(/m²,\s*([^/,]+)\/(\d+)층/);
    if (floorM) { floorCur = floorM[1].trim(); floorTotal = floorM[2]; }

    const dirM = detail.match(/(남동|남서|북동|북서|동|서|남|북)향/);
    if (dirM) direction = dirM[0];
  }

  // 건축년수: 태그 첫 단어
  let buildAge = '';
  const tagM = tagLine.match(/^(\d+년이(?:상|내))/);
  if (tagM) buildAge = tagM[1];

  // 확인날짜
  let confirmDate = '';
  const dtM = dateLine.match(/확인매물\s+(\d{2}\.\d{2}\.\d{2})/);
  if (dtM) confirmDate = '20' + dtM[1];

  const exclPyeong = (!isNaN(parseFloat(exclArea)) && parseFloat(exclArea) > 0)
    ? (parseFloat(exclArea) / 3.3058).toFixed(1) : '-';

  return { ownerType, name, dealType, price, houseType,
           supplyArea, exclArea, exclPyeong, floorCur, floorTotal, direction,
           buildAge, agent, confirmDate, highlight };
}

function parseNaverText(text) {
  // 노이즈 제거
  const cleaned = text
    .replace(/\r\n/g, '\n')
    .replace(/\d+개의 매물사진이 있습니다\.\n?/g, '')
    .replace(/네이버에서 보기\n?/g, '');

  const lines = cleaned.split('\n');
  const listings = [];
  let block = [];

  for (const line of lines) {
    block.push(line);
    // 확인매물 날짜 줄을 만나면 블록 종료
    if (/^확인매물\s+\d{2}\.\d{2}\.\d{2}/.test(line.trim())) {
      const listing = parseNaverBlock(block);
      if (listing) listings.push(listing);
      block = [];
    }
  }

  return listings;
}

/* 페이지네이션 상태 */
window._naverFiltered  = [];
window._naverPage      = 1;
window._naverPageSize  = 100;

/* 행 렌더링 - 필터된 전체 목록을 받아 페이지네이션 적용 */
function renderNaverRows(listings) {
  window._naverFiltered = listings;
  window._naverPage = 1;
  _renderNaverPage();
}

function _renderNaverPage() {
  const DEAL_COLOR = { '매매': '#2563eb', '전세': '#7c3aed', '월세': '#b45309' };
  const tbody = document.getElementById('naver-tbody');
  if (!tbody) return;

  const total    = window._naverFiltered.length;
  const size     = window._naverPageSize;
  const page     = window._naverPage;
  const start    = (page - 1) * size;
  const end      = Math.min(start + size, total);
  const pageData = window._naverFiltered.slice(start, end);

  tbody.innerHTML = pageData.map((r, i) => {
    const color  = DEAL_COLOR[r.dealType] || '';
    const supply = (r.supplyArea && r.supplyArea !== '-') ? r.supplyArea : '-';
    const excl   = r.exclArea   || '-';
    const pyeong = r.exclPyeong || (excl !== '-' ? (parseFloat(excl) / 3.3058).toFixed(1) : '-');
    const nameTitle = r.name ? ` title="${esc((r.ownerType || '') + r.name)}"` : '';
    const seq = start + i + 1;
    return `<tr>
      <td class="col-seq"${nameTitle}>${seq}${r.ownerType ? `<br><small style="color:#888">${r.ownerType}</small>` : ''}</td>
      <td style="text-align:center;font-weight:700;color:${color}">${esc(r.dealType)}</td>
      <td class="col-price" style="font-weight:600">${esc(r.price)}</td>
      <td class="col-type">${esc(r.houseType)}</td>
      <td style="text-align:center;font-size:12px">${esc(supply)}</td>
      <td style="text-align:center;font-size:12px">${esc(excl)}</td>
      <td style="text-align:center;font-size:12px;font-weight:600;color:#0f766e">${esc(pyeong)}</td>
      <td class="col-floor">${esc(r.floorCur)}</td>
      <td class="col-floor">${esc(r.floorTotal)}</td>
      <td style="text-align:center">${esc(r.direction)}</td>
      <td style="text-align:center;font-size:11px">${esc(r.buildAge)}</td>
      <td style="font-size:12px">${esc(r.agent)}</td>
      <td style="font-size:11px;text-align:center;white-space:nowrap">${esc(r.confirmDate)}</td>
      <td class="col-notes">${esc(r.highlight)}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="14" class="auction-empty">결과가 없습니다.</td></tr>';

  _renderNaverPagination(total, page, size);
}

function _renderNaverPagination(total, page, size) {
  const el = document.getElementById('naver-pagination');
  if (!el) return;
  const totalPages = Math.ceil(total / size) || 1;
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  const MAX_BTNS = 7;
  let startP = Math.max(1, page - Math.floor(MAX_BTNS / 2));
  let endP   = Math.min(totalPages, startP + MAX_BTNS - 1);
  if (endP - startP < MAX_BTNS - 1) startP = Math.max(1, endP - MAX_BTNS + 1);

  let html = `<button class="npg-btn" onclick="naverGoPage(${page - 1})" ${page === 1 ? 'disabled' : ''}>‹</button>`;
  if (startP > 1) html += `<button class="npg-btn" onclick="naverGoPage(1)">1</button>${startP > 2 ? '<span class="npg-ellipsis">…</span>' : ''}`;
  for (let p = startP; p <= endP; p++) {
    html += `<button class="npg-btn${p === page ? ' active' : ''}" onclick="naverGoPage(${p})">${p}</button>`;
  }
  if (endP < totalPages) html += `${endP < totalPages - 1 ? '<span class="npg-ellipsis">…</span>' : ''}<button class="npg-btn" onclick="naverGoPage(${totalPages})">${totalPages}</button>`;
  html += `<button class="npg-btn" onclick="naverGoPage(${page + 1})" ${page === totalPages ? 'disabled' : ''}>›</button>`;
  html += `<span class="npg-info">${(page - 1) * size + 1}–${Math.min(page * size, total)} / ${total}건</span>`;
  el.innerHTML = html;
}

function naverGoPage(p) {
  const totalPages = Math.ceil(window._naverFiltered.length / window._naverPageSize) || 1;
  window._naverPage = Math.max(1, Math.min(p, totalPages));
  _renderNaverPage();
  // 표 상단으로 스크롤
  const wrap = document.querySelector('.naver-result-section .auction-table-wrap');
  if (wrap) wrap.scrollTop = 0;
}

function naverSetPageSize() {
  const sel = document.getElementById('naver-page-size');
  if (!sel) return;
  window._naverPageSize = parseInt(sel.value, 10);
  window._naverPage = 1;
  _renderNaverPage();
}

/* 엑셀 다운로드 */
function downloadNaverExcel() {
  const data = window._naverFiltered;
  if (!data?.length) { showToast('다운로드할 데이터가 없습니다.', 'error'); return; }

  const DEAL_COLOR_LABEL = { '매매': '매매', '전세': '전세', '월세': '월세' };
  const rows = data.map((r, i) => ({
    '순번':      i + 1,
    '유형':      r.dealType   || '',
    '가격':      r.price      || '',
    '종류':      r.houseType  || '',
    '공급(㎡)':  r.supplyArea || '',
    '전용(㎡)':  r.exclArea   || '',
    '전용(평)':  r.exclPyeong || '',
    '해당층':    r.floorCur   || '',
    '전체층':    r.floorTotal || '',
    '향':        r.direction  || '',
    '년식':      r.buildAge   || '',
    '공인중개사': r.agent      || '',
    '확인날짜':  r.confirmDate|| '',
    '자랑거리':  r.highlight  || '',
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '호가분석');

  const title = (window._naverTitle || '호가분석').replace(/[\\/:*?"<>|]/g, '_');
  XLSX.writeFile(wb, `${title}.xlsx`);
}

/* 필터 적용 */
function applyNaverFilter() {
  if (!window._naverListings?.length) return;

  // 1) 텍스트/셀렉트 필터
  const textFilters = {};
  document.querySelectorAll('#naver-filter-row .nf-inp[data-key]').forEach(el => {
    const v = el.value.trim().toLowerCase();
    if (v) textFilters[el.dataset.key] = v;
  });

  // 2) 범위 필터 (exclPyeong, floorCur)
  const rangeFilters = {};
  document.querySelectorAll('#naver-filter-row .nf-range-inp[data-range]').forEach(el => {
    const key   = el.dataset.range;
    const bound = el.dataset.bound;
    const v     = el.value.trim();
    if (v !== '' && !isNaN(parseFloat(v))) {
      if (!rangeFilters[key]) rangeFilters[key] = {};
      rangeFilters[key][bound] = parseFloat(v);
    }
  });

  // 3) 종류 체크박스
  const checkedTypes = Array.from(
    document.querySelectorAll('#naver-type-checks input[type=checkbox]:checked')
  ).map(cb => cb.value);

  // 4) 향 체크박스
  const checkedDirs = Array.from(
    document.querySelectorAll('#naver-dir-checks input[type=checkbox]:checked')
  ).map(cb => cb.value);

  const filtered = window._naverListings.filter(r => {
    // 텍스트 필터
    for (const [key, val] of Object.entries(textFilters)) {
      if (!(r[key] ?? '').toString().toLowerCase().includes(val)) return false;
    }
    // 범위 필터
    for (const [key, bounds] of Object.entries(rangeFilters)) {
      const v = parseFloat(r[key]);
      if (isNaN(v)) return false;
      if (bounds.min !== undefined && v < bounds.min) return false;
      if (bounds.max !== undefined && v > bounds.max) return false;
    }
    // 종류 체크박스
    if (checkedTypes.length > 0 && !checkedTypes.includes(r.houseType)) return false;
    // 향 체크박스
    if (checkedDirs.length > 0 && !checkedDirs.includes(r.direction)) return false;
    return true;
  });

  // 5) 가격 정렬
  const sortPrice = (document.getElementById('naver-sort-price')?.value) || '';
  if (sortPrice) {
    const toNum = s => {
      if (!s) return 0;
      s = s.replace(/,/g, '');
      let total = 0;
      const eokM = s.match(/([\d.]+)억/);
      if (eokM) {
        total += parseFloat(eokM[1]) * 100000000;
        const rest = s.slice(s.indexOf('억') + 1).match(/([\d.]+)/);
        if (rest) total += parseFloat(rest[1]) * 10000;
      } else {
        const manM = s.match(/([\d.]+)만/);
        if (manM) total += parseFloat(manM[1]) * 10000;
        else total = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
      }
      return total;
    };
    filtered.sort((a, b) => sortPrice === 'asc'
      ? toNum(a.price) - toNum(b.price)
      : toNum(b.price) - toNum(a.price)
    );
  }

  renderNaverRows(filtered);
  updateTypeSummary();
  updateDirSummary();

  const total = window._naverListings.length;
  const badge = document.getElementById('naver-count-badge');
  if (badge) badge.textContent = filtered.length < total
    ? `${filtered.length}/${total}건` : `${total}건`;
}

function updateTypeSummary() {
  const summary = document.getElementById('naver-type-summary');
  if (!summary) return;
  const checked = Array.from(
    document.querySelectorAll('#naver-type-checks input:checked')
  ).map(cb => cb.value);
  summary.textContent = checked.length ? checked.join('·') : '전체';
}

function updateDirSummary() {
  const summary = document.getElementById('naver-dir-summary');
  if (!summary) return;
  const checked = Array.from(
    document.querySelectorAll('#naver-dir-checks input:checked')
  ).map(cb => cb.value.replace('향', ''));
  summary.textContent = checked.length ? checked.join('·') : '전체';
}

function clearNaverFilters() {
  document.querySelectorAll('#naver-filter-row input:not([type=checkbox]), #naver-filter-row select').forEach(el => {
    el.value = '';
  });
  document.querySelectorAll('#naver-type-checks input[type=checkbox], #naver-dir-checks input[type=checkbox]').forEach(cb => { cb.checked = false; });
  updateTypeSummary();
  updateDirSummary();
}

function analyzeNaver() {
  const text = (document.getElementById('naver-paste-area').value || '').trim();
  if (!text) { showToast('텍스트를 붙여넣으세요.', 'error'); return; }

  const listings = parseNaverText(text);
  if (!listings.length) {
    showToast('매물을 파싱할 수 없습니다. 형식을 확인하세요.', 'error');
    return;
  }

  const si   = (document.getElementById('naver-si').value   || '').trim();
  const gu   = (document.getElementById('naver-gu').value   || '').trim();
  const dong = (document.getElementById('naver-dong').value || '').trim();
  const _d = new Date();
  const today = `${_d.getFullYear()}.${String(_d.getMonth()+1).padStart(2,'0')}.${String(_d.getDate()).padStart(2,'0')}`;
  const loc   = [si, gu, dong].filter(Boolean).join(' ');
  const title = `${today} ${loc ? loc + `(${listings.length}) ` : `(${listings.length}) `}호가분석`;

  window._naverListings  = listings;
  window._naverTitle     = title;

  /* 게시판 자동 저장 */
  const analyses = _getNaverAnalyses();
  const id = Date.now().toString();
  analyses.unshift({ id, title, listings });
  _setNaverAnalyses(analyses);
  window._naverActiveId = null; // 게시판 뷰로 이동하므로 선택 없음

  /* 게시판 뷰로 전환 */
  showNaverBoard();
  showToast('분석 결과가 저장되었습니다.');
}

function clearNaverInput() {
  document.getElementById('naver-paste-area').value = '';
  document.getElementById('naver-count-badge').textContent = '';
  window._naverListings = null;
  window._naverTitle    = null;
  window._naverActiveId = null;
  clearNaverFilters();
  showNaverBoard();
}

/* ── 네이버 분석 저장/불러오기 (localStorage) ── */

function _getNaverAnalyses() {
  try { return JSON.parse(localStorage.getItem('naver_analyses') || '[]'); } catch { return []; }
}
function _setNaverAnalyses(arr) {
  localStorage.setItem('naver_analyses', JSON.stringify(arr));
}

function loadNaverAnalysis(id) {
  const item = _getNaverAnalyses().find(a => a.id === id);
  if (!item) return;
  window._naverListings  = item.listings;
  window._naverTitle     = item.title;
  window._naverActiveId  = id;
  document.getElementById('naver-result-title').textContent = item.title;
  document.getElementById('naver-count-badge').textContent  = item.listings.length + '건';
  clearNaverFilters();
  renderNaverRows(item.listings);
  // 게시판 숨기고 표 표시
  document.getElementById('naver-board-view').style.display  = 'none';
  document.getElementById('naver-result-section').style.display = 'flex';
  const emptyState = document.getElementById('naver-empty-state');
  if (emptyState) emptyState.style.display = 'none';
  switchView('naver');
}

function deleteAllNaverAnalyses() {
  if (!confirm('저장된 분석을 모두 삭제하시겠습니까?')) return;
  _setNaverAnalyses([]);
  window._naverActiveId = null;
  document.getElementById('naver-result-section').style.display = 'none';
  showNaverBoard();
  showToast('전체 삭제되었습니다.');
}

function deleteNaverAnalysis(id, e) {
  e.stopPropagation();
  if (!confirm('이 분석을 삭제하시겠습니까?')) return;
  _setNaverAnalyses(_getNaverAnalyses().filter(a => a.id !== id));
  if (window._naverActiveId === id) {
    window._naverActiveId = null;
    document.getElementById('naver-result-section').style.display = 'none';
    showNaverBoard();
  } else {
    renderNaverBoard();
  }
  showToast('삭제되었습니다.');
}

/* 게시판 뷰로 전환 (우측) */
function showNaverBoard() {
  document.getElementById('naver-result-section').style.display = 'none';
  document.getElementById('naver-empty-state').style.display    = 'none';
  document.getElementById('naver-board-view').style.display = 'block';
  document.getElementById('naver-count-badge').textContent      = '';
  renderNaverBoard();
}

/* 게시판 목록 렌더링 */
function renderNaverBoard() {
  const list   = document.getElementById('naver-board-list');
  const empty  = document.getElementById('naver-board-empty');
  if (!list) return;
  const analyses = _getNaverAnalyses();
  const delAllBtn = document.getElementById('naver-delete-all-btn');
  if (!analyses.length) {
    list.innerHTML = '';
    if (empty) empty.style.display = '';
    if (delAllBtn) delAllBtn.style.display = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (delAllBtn) delAllBtn.style.display = '';
  list.innerHTML = analyses.map(a => {
    return `<div class="naver-board-item" onclick="loadNaverAnalysis('${a.id}')">
      <div class="naver-board-title-row">
        <span class="naver-board-title">${esc(a.title)}</span>
        <button class="naver-history-del" onclick="deleteNaverAnalysis('${a.id}', event)" title="삭제">✕</button>
      </div>
    </div>`;
  }).join('');
}

/* 하위 호환 - 사이드바 히스토리가 있던 시절 */
function renderNaverHistory() { renderNaverBoard(); }

/* ═══════════════════════════════════════════════════════
   수익률 분석
═══════════════════════════════════════════════════════ */

let profitItem  = null;
let profitType  = '개인';
let profitSaved = {};

/* ── 세율 시나리오 테이블 ── */
const ACQ_TAX_SCENARIOS = {
  '개인': [
    { label: '무주택 → 1주택 (1.1%)',  rate: 1.1 },
    { label: '1주택 → 2주택 (1.1%)',   rate: 1.1 },
    { label: '2주택 → 3주택 (8%)',     rate: 8.0 },
    { label: '3주택 이상 (12%)',        rate: 12.0 },
    { label: '공시가 1억 미만 (1.1%)', rate: 1.1 },
    { label: '오피스텔/상가 (4.6%)',   rate: 4.6 },
  ],
  '개인매매사업자': [
    { label: '무주택 → 1주택 (1.1%)',  rate: 1.1 },
    { label: '1주택 → 2주택 (1.1%)',   rate: 1.1 },
    { label: '2주택 → 3주택 (8%)',     rate: 8.0 },
    { label: '3주택 이상 (12%)',        rate: 12.0 },
    { label: '공시가 1억 미만 (1.1%)', rate: 1.1 },
    { label: '오피스텔/상가 (4.6%)',   rate: 4.6 },
  ],
  '법인사업자': [
    { label: '공시가 1억 이상 · 주택 (12%)', rate: 12.0 },
    { label: '공시가 1억 미만 (1.1%)',       rate: 1.1 },
    { label: '오피스텔/상가 (4.6%)',         rate: 4.6 },
  ],
};

const TRANSFER_TAX_SCENARIOS = {
  '개인': [
    { label: '직접입력',                        rate: null },
    { label: '1년 미만 보유 (70%)',             rate: 70 },
    { label: '1~2년 보유 (60%)',                rate: 60 },
    { label: '2년이상 · 1,400만 이하 (6%)',    rate: 6 },
    { label: '2년이상 · 1,400~5,000만 (15%)', rate: 15 },
    { label: '2년이상 · 5,000~8,800만 (24%)', rate: 24 },
    { label: '2년이상 · 8,800만~1.5억 (35%)', rate: 35 },
    { label: '2년이상 · 1.5억~3억 (38%)',     rate: 38 },
    { label: '2년이상 · 3억~5억 (40%)',       rate: 40 },
    { label: '2년이상 · 5억 초과 (42%)',      rate: 42 },
  ],
  '개인매매사업자': [
    { label: '직접입력',                      rate: null },
    { label: '순수익 1,400만 이하 (6%)',     rate: 6 },
    { label: '순수익 1,400~5,000만 (15%)',  rate: 15 },
    { label: '순수익 5,000~8,800만 (24%)',  rate: 24 },
    { label: '순수익 8,800만~1.5억 (35%)', rate: 35 },
    { label: '순수익 1.5억~3억 (38%)',     rate: 38 },
    { label: '순수익 3억~5억 (40%)',       rate: 40 },
    { label: '순수익 5억 초과 (42%)',      rate: 42 },
  ],
  '법인사업자': [
    { label: '직접입력',      rate: null },
    { label: '주택 (30%)',   rate: 30 },
    { label: '비주택 (10%)', rate: 10 },
  ],
};

/* ── 드롭다운 옵션 채우기 ── */
function populateProfitScenarios(type) {
  const acqSel = document.getElementById('pf-acq-scenario');
  const trSel  = document.getElementById('pf-transfer-scenario');
  if (!acqSel || !trSel) return;

  acqSel.innerHTML = (ACQ_TAX_SCENARIOS[type] || [])
    .map((s, i) => `<option value="${i}">${s.label}</option>`).join('');
  trSel.innerHTML  = (TRANSFER_TAX_SCENARIOS[type] || [])
    .map((s, i) => `<option value="${i}">${s.label}</option>`).join('');
}

/* ── 취득세 시나리오 변경 ── */
function onAcqScenarioChange() {
  const sel = document.getElementById('pf-acq-scenario');
  const scenario = (ACQ_TAX_SCENARIOS[profitType] || [])[parseInt(sel.value, 10)];
  if (scenario) {
    document.getElementById('pf-acq-tax-rate').value = scenario.rate;
  }
  calcProfitAll();
}

/* ── 양도세 시나리오 변경 ── */
function onTransferScenarioChange() {
  const sel      = document.getElementById('pf-transfer-scenario');
  const scenario = (TRANSFER_TAX_SCENARIOS[profitType] || [])[parseInt(sel.value, 10)];
  if (!scenario) return;
  const rateEl = document.getElementById('pf-transfer-tax-rate');
  if (scenario.rate != null) {
    rateEl.value = scenario.rate;
    autoCalcTransferTax();
  } else {
    rateEl.value = '';
  }
  calcProfitAll();
}

/* ── 양도세율 변경 → 양도세 자동계산 ── */
function onTransferRateChange() {
  autoCalcTransferTax();
  calcProfitAll();
}

function autoCalcTransferTax() {
  const rate = parseFloat(document.getElementById('pf-transfer-tax-rate')?.value || '') || 0;
  if (!rate) return;
  // raw(): readonly 자동계산 필드 → 만원
  const raw = id => parseFloat(document.getElementById(id)?.dataset.raw || '0') || 0;
  // won(): 원 단위 입력/editable 필드 → 만원으로 변환
  const won = id => raw(id) / 10000;
  const salePrice  = won('pf-sale-price');   // 원 입력 필드
  const winning    = won('pf-winning');       // 원 입력 필드
  const acqTax     = raw('pf-acq-tax');       // 자동계산 readonly → 만원
  const interior   = won('pf-interior');      // editable 필드
  const legalFee   = won('pf-legal-fee');     // editable 필드
  const totalInt   = raw('pf-total-int');     // 자동계산 readonly → 만원
  const brokerage  = raw('pf-brokerage');     // 자동계산 readonly → 만원
  const base = salePrice - winning - acqTax - interior - legalFee - totalInt - brokerage;
  const tax  = base > 0 ? Math.round(base * rate / 100) : 0;
  const taxWon = tax * 10000; // 원 단위로 저장
  const trEl = document.getElementById('pf-transfer-tax');
  if (trEl) { trEl.dataset.raw = taxWon; trEl.value = taxWon.toLocaleString() + '원'; }
}

/* ── 모달 열기 ── */
async function openProfitModal(myAuctionId) {
  profitItem = myAuctionData.find(r => r.id === myAuctionId) ||
               myAuctionFiltered.find(r => r.id === myAuctionId);
  if (!profitItem) return;
  document.getElementById('profit-modal').style.display = '';
  fillProfitItemInfo(profitItem);
  try {
    const analyses = await fetch(`/api/profit-analysis/${myAuctionId}`).then(r => r.json());
    profitSaved = {};
    if (Array.isArray(analyses)) analyses.forEach(a => { profitSaved[a.buyer_type] = a; });
  } catch (_) { profitSaved = {}; }
  switchProfitTab('개인');
}

/* ── 모달 닫기 ── */
function closeProfitModal() {
  document.getElementById('profit-modal').style.display = 'none';
  profitItem  = null;
  profitSaved = {};
}

/* ── 탭 전환 ── */
function switchProfitTab(type) {
  profitType = type;
  document.querySelectorAll('.profit-tab').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.type === type));
  populateProfitScenarios(type);
  const saved = profitSaved[type];
  if (saved) { loadProfitFields(saved); } else { resetProfitFields(); autoFillProfitFromItem(); }
  calcProfitAll();
  document.getElementById('profit-save-status').textContent =
    saved ? `마지막 저장: ${(saved.updated_at || '').slice(0, 16).replace('T', ' ')}` : '';
}

/* ── 물건 정보 표시 ── */
function fillProfitItemInfo(item) {
  document.getElementById('pi-item-type').textContent     = item.item_type || '-';
  document.getElementById('pi-address').textContent       = item.address || '-';
  document.getElementById('pi-appraisal').textContent     = item.appraisal_price != null ? fmtWon(item.appraisal_price) : '-';
  document.getElementById('pi-min-price').textContent     = item.min_price != null ? fmtWon(item.min_price) : '-';
  document.getElementById('pi-official').textContent      = item.official_price != null ? fmtWon(item.official_price) : '-';
  const pyeong = item.building_area;
  document.getElementById('pi-building-area').textContent = pyeong != null
    ? `${pyeong}평 (${(pyeong * 3.3058).toFixed(1)}㎡)` : '-';
  document.getElementById('profit-modal-item-name').textContent =
    item.case_no ? ` — ${item.case_no}` : '';
}

/* ── 저장된 값 로드 ── */
function loadProfitFields(saved) {
  // 일반 숫자/퍼센트 필드
  const map = {
    'pf-loan-ratio':        'loan_ratio',
    'pf-acq-tax-rate':      'acq_tax_rate',
    'pf-rent-months':       'rent_months',
    'pf-loan-rate':         'loan_rate',
    'pf-holding':           'holding_months',
    'pf-transfer-tax-rate': 'transfer_tax_rate',
  };
  Object.entries(map).forEach(([elId, key]) => {
    const el = document.getElementById(elId);
    if (el && saved[key] != null) el.value = saved[key];
  });
  // 원 단위 표시 필드
  ['pf-acquired-deposit','pf-unpaid-maintenance',
   'pf-jeonse-deposit','pf-monthly-rent','pf-transfer-tax','pf-sale-price'].forEach(id => {
    const key = {
      'pf-acquired-deposit':  'acquired_deposit',
      'pf-unpaid-maintenance':'unpaid_maintenance',
      'pf-jeonse-deposit':    'jeonse_deposit',
      'pf-monthly-rent':      'monthly_rent',
      'pf-transfer-tax':      'transfer_tax',
      'pf-sale-price':        'sale_price',
    }[id];
    if (saved[key] != null) setWonInput(id, saved[key]);
  });
  // 자동계산+수동수정 필드 복원 (저장값 있으면 override 플래그 세팅)
  const editableMap = {
    'pf-eviction': 'eviction_cost',
    'pf-interior': 'interior_cost',
    'pf-legal-fee': 'legal_fee',
  };
  Object.entries(editableMap).forEach(([elId, key]) => {
    if (saved[key] != null) {
      const el = document.getElementById(elId);
      if (!el) return;
      const won = Math.round(saved[key]) * 10000;
      el.dataset.raw = won;
      el.dataset.override = '1';
      el.value = won.toLocaleString() + '원';
    }
  });
  // 취득세 시나리오 복원
  if (saved.acq_tax_scenario) {
    const scenarios = ACQ_TAX_SCENARIOS[profitType] || [];
    const idx = scenarios.findIndex(s => s.label === saved.acq_tax_scenario);
    if (idx >= 0) document.getElementById('pf-acq-scenario').value = idx;
  }
  // 양도세 시나리오 복원
  if (saved.transfer_tax_scenario) {
    const scenarios = TRANSFER_TAX_SCENARIOS[profitType] || [];
    const idx = scenarios.findIndex(s => s.label === saved.transfer_tax_scenario);
    if (idx >= 0) document.getElementById('pf-transfer-scenario').value = idx;
  }
  // 낙찰가 원 단위 표시
  const winEl2 = document.getElementById('pf-winning');
  if (winEl2 && saved.winning_price != null) {
    const winWon = Math.round(saved.winning_price) * 10000;
    winEl2.dataset.raw = winWon;
    winEl2.value = winWon.toLocaleString() + '원';
  }
  // 감정가대비% 재계산
  const winning   = saved.winning_price || 0;
  const appraisal = profitItem?.appraisal_price || 0;
  if (appraisal > 0 && winning > 0)
    document.getElementById('pf-appraisal-ratio').value = (winning / appraisal * 100).toFixed(1);
}

/* ── 폼 초기화 ── */
function resetProfitFields() {
  ['pf-winning','pf-appraisal-ratio','pf-loan-ratio',
   'pf-acq-tax-rate','pf-acquired-deposit','pf-unpaid-maintenance',
   'pf-jeonse-deposit','pf-monthly-rent','pf-rent-months',
   'pf-loan-rate','pf-holding','pf-sale-price',
   'pf-transfer-tax-rate','pf-transfer-tax'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.dataset.raw = ''; }
  });
  // 자동계산+수동수정 필드 override 초기화
  ['pf-eviction','pf-interior','pf-legal-fee'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.dataset.raw = ''; el.dataset.override = ''; }
  });
  const acqSel = document.getElementById('pf-acq-scenario');
  const trSel  = document.getElementById('pf-transfer-scenario');
  if (acqSel) acqSel.selectedIndex = 0;
  if (trSel)  trSel.selectedIndex  = 0;
}

/* ── 매도금액 ↔ 매매시세 동기화 ── */
let _salePriceChanged = false; // 사용자가 실제로 입력했을 때만 sync

function onSalePriceInput() {
  const el = document.getElementById('pf-sale-price');
  wonInput(el, calcProfitAll);
  _salePriceChanged = true;
}

function onSalePriceBlur() {
  const el = document.getElementById('pf-sale-price');
  wonBlur(el);
  // 사용자가 직접 입력한 경우에만 매매시세 동기화
  if (!profitItem || !_salePriceChanged) { _salePriceChanged = false; return; }
  _salePriceChanged = false;
  const manWon = el.dataset.raw ? Math.round(parseFloat(el.dataset.raw) / 10000) : null;
  // 로컬 데이터 업데이트
  profitItem.sale_market = manWon;
  [myAuctionData, myAuctionFiltered].forEach(arr => {
    const r = arr.find(x => x.id === profitItem.id);
    if (r) r.sale_market = manWon;
  });
  // DB 저장
  fetch(`/api/my-auction/${profitItem.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sale_market: manWon }),
  }).catch(() => {});
  // 테이블 셀 즉시 업데이트
  const cell = document.querySelector(`#my-auction-tbody tr[data-id="${profitItem.id}"] td[data-field="sale_market"]`);
  if (cell) {
    cell.dataset.val = manWon ?? '';
    cell.innerHTML = fmtAmt(manWon);
  }
}

/* ── 자동 초기값 채우기 ── */
function autoFillProfitFromItem() {
  if (!profitItem) return;
  const minPrice  = profitItem.min_price      || 0;
  const appraisal = profitItem.appraisal_price || 0;
  const winEl = document.getElementById('pf-winning');
  const minWon = (minPrice || 0) * 10000;
  winEl.dataset.raw = minWon || '';
  winEl.value = minWon ? minWon.toLocaleString() + '원' : '';
  if (appraisal > 0 && minPrice > 0)
    document.getElementById('pf-appraisal-ratio').value = (minPrice / appraisal * 100).toFixed(1);
  // 취득세 시나리오: 물건 유형 기준 자동 선택
  const itemType   = profitItem.item_type || '';
  const officialWon = (profitItem.official_price || 0) * 10000;
  const scenarios  = ACQ_TAX_SCENARIOS[profitType] || [];
  let acqIdx = 0;
  if (/오피스텔/.test(itemType) || /상가|근린|업무/.test(itemType)) {
    acqIdx = scenarios.findIndex(s => s.label.includes('오피스텔'));
  } else if (officialWon > 0 && officialWon < 100000000) {
    acqIdx = scenarios.findIndex(s => s.label.includes('1억 미만'));
  }
  const acqSel = document.getElementById('pf-acq-scenario');
  if (acqSel && acqIdx >= 0) acqSel.selectedIndex = acqIdx;
  document.getElementById('pf-acq-tax-rate').value = (scenarios[acqIdx] || scenarios[0])?.rate || 1.1;
  // 매매시세 → 매도금액 기본값
  if (profitItem.sale_market) setWonInput('pf-sale-price', profitItem.sale_market);
}

/* ── 원 입력/표시 범용 헬퍼 ── */
function wonFocus(el) {
  if (el.dataset.raw) el.value = el.dataset.raw;
}
function wonBlur(el) {
  const won = parseFloat(el.value.replace(/[^0-9.]/g, '')) || 0;
  el.dataset.raw = won || '';
  el.value = won ? won.toLocaleString() + '원' : '';
}
function wonInput(el, fn) {
  el.dataset.raw = parseFloat(el.value) || '';
  if (fn) fn();
}
/* 자동계산 + 수동 수정 가능 필드 */
function wonInputEditable(el, fn) {
  const val = parseFloat(el.value) || 0;
  el.dataset.raw = val || '';
  el.dataset.override = val ? '1' : '';
  if (fn) fn();
}
/* DB 저장값(만원) → 원 단위로 입력 필드에 세팅 */
function setWonInput(id, manWon) {
  const el = document.getElementById(id);
  if (!el || manWon == null) return;
  const won = Math.round(manWon) * 10000;
  el.dataset.raw = won;
  el.value = won.toLocaleString() + '원';
}
/* 자동계산 결과(만원)를 override 없을 때만 세팅 */
function setEditable(id, manWon) {
  const el = document.getElementById(id);
  if (!el || el.dataset.override === '1') return;
  const won = Math.round(manWon) * 10000;
  el.dataset.raw = won;
  el.value = won.toLocaleString() + '원';
}

/* ── 낙찰가 포커스/블러 ── */
function onWinningFocus() {
  const el = document.getElementById('pf-winning');
  if (el.dataset.raw) el.value = el.dataset.raw;
}
function onWinningBlur() {
  const el  = document.getElementById('pf-winning');
  const won = parseFloat(el.value.replace(/[^0-9.]/g, '')) || 0;
  el.dataset.raw = won || '';
  el.value = won ? won.toLocaleString() + '원' : '';
}

/* ── 낙찰가 ↔ 감정가대비% 연동 ── */
function onProfitWinningChange() {
  const el  = document.getElementById('pf-winning');
  const won = parseFloat(el.value) || 0; // 사용자가 원 단위로 입력
  el.dataset.raw = won || '';
  const appraisal = profitItem?.appraisal_price || 0; // 만원
  if (appraisal > 0)
    document.getElementById('pf-appraisal-ratio').value = ((won / 10000) / appraisal * 100).toFixed(1);
  calcProfitAll();
}
function onProfitRatioChange() {
  const ratio     = parseFloat(document.getElementById('pf-appraisal-ratio').value) || 0;
  const appraisal = profitItem?.appraisal_price || 0; // 만원
  if (appraisal > 0) {
    const winningWon = Math.round(appraisal * ratio / 100) * 10000; // 원
    const el = document.getElementById('pf-winning');
    el.dataset.raw = winningWon;
    el.value = winningWon.toLocaleString() + '원';
  }
  calcProfitAll();
}

/* ── 전체 계산 ── */
function calcProfitAll() {
  if (!profitItem) return;
  // raw(): readonly 자동계산 필드 - dataset.raw는 만원
  const raw = id => parseFloat(document.getElementById(id)?.dataset.raw || '0') || 0;
  // won(): 원 단위 입력 필드 - dataset.raw는 원, 만원으로 변환
  const won = id => raw(id) / 10000;
  // g(): 일반 숫자/% 입력 필드
  const g = id => {
    const el = document.getElementById(id);
    if (!el) return 0;
    if (el.dataset.raw !== undefined && el.dataset.raw !== '') return parseFloat(el.dataset.raw) || 0;
    return parseFloat(el.value || '0') || 0;
  };

  const winning    = won('pf-winning');
  const loanRatio  = g('pf-loan-ratio');
  const taxRate    = g('pf-acq-tax-rate');
  const acqDep     = won('pf-acquired-deposit');
  const unpaidMnt  = won('pf-unpaid-maintenance');
  const loanRate   = g('pf-loan-rate');
  const holding    = g('pf-holding');
  const jeonse     = won('pf-jeonse-deposit');
  const mRent      = won('pf-monthly-rent');
  const rentMo     = g('pf-rent-months');
  const salePrice  = won('pf-sale-price');
  const transferTax = won('pf-transfer-tax');
  const minPrice   = profitItem.min_price     || 0;
  const pyeong     = profitItem.building_area || 0;

  /* ── 초기투자비용 ── */
  // 은행대출
  const loan = Math.round(winning * loanRatio / 100);
  setVal('pf-loan', loan);

  // 입찰보증금
  const deposit = Math.round(minPrice * 0.1);
  setVal('pf-deposit', deposit);

  // 납부잔금 = 낙찰가 - 대출 - 보증금
  setVal('pf-remaining', Math.max(0, winning - loan - deposit));

  // 취득세
  const acqTax = Math.round(winning * taxRate / 100);
  setVal('pf-acq-tax', acqTax);

  // 명도비(이사비or소송비): 자동계산, 수동수정 가능
  setEditable('pf-eviction', Math.round(pyeong * 5));
  const eviction = won('pf-eviction');

  // 인테리어/수리/청소: 자동계산, 수동수정 가능
  setEditable('pf-interior', Math.round(pyeong * 20));
  const interior = won('pf-interior');

  // 법무사비 기타 자문비 합계: 자동계산, 수동수정 가능
  const legalFeeAuto = profitType === '법인사업자' ? 100 : Math.round(winning * 0.005);
  setEditable('pf-legal-fee', legalFeeAuto);
  const legalFee = won('pf-legal-fee');

  // 비용소계(a)
  const costSubtotal = acqTax + acqDep + eviction + interior + legalFee + unpaidMnt;
  setSubtotal('pf-cost-subtotal', costSubtotal);

  // 자기자본 = 낙찰가 - 대출 + 비용소계
  const ownCapital = Math.max(0, winning - loan + costSubtotal);
  setSubtotal('pf-own-capital', ownCapital);

  // 총투자금액 = 낙찰가 + 비용소계
  const totalInvest = winning + costSubtotal;
  setSubtotal('pf-total-invest', totalInvest);

  /* ── 수입 ── */
  const incomeSubtotal = jeonse + mRent * rentMo;
  setSubtotal('pf-income-subtotal', incomeSubtotal);

  /* ── 지출 ── */
  const monthlyInt = Math.round(loan * loanRate / 100 / 12);
  const totalInt   = Math.round(monthlyInt * holding);
  setVal('pf-monthly-int', monthlyInt);
  setVal('pf-total-int', totalInt);

  const brokerage = Math.round(salePrice * 0.004);
  setVal('pf-brokerage', brokerage);

  // 지출소계(b)
  const expenseSubtotal = totalInt + transferTax + brokerage;
  setSubtotal('pf-expense-subtotal', expenseSubtotal);

  /* ── 최종 결과 ── */
  const totalCost = costSubtotal + expenseSubtotal;
  const netProfit = (salePrice - winning) - totalCost;
  const profitRate = ownCapital > 0 ? (netProfit / ownCapital * 100) : 0;

  const tcEl   = document.getElementById('pf-total-cost');
  const ocEl   = document.getElementById('pf-own-capital-result');
  const npEl   = document.getElementById('pf-net-profit');
  const prEl   = document.getElementById('pf-profit-rate');
  if (tcEl) tcEl.textContent = fmtWon(Math.round(totalCost));
  if (ocEl) ocEl.textContent = fmtWon(Math.round(ownCapital));
  if (npEl) {
    npEl.textContent = (netProfit >= 0 ? '+' : '') + (Math.round(netProfit) * 10000).toLocaleString() + '원';
    npEl.className   = 'profit-result-val profit-result-main ' + (netProfit >= 0 ? 'profit-pos' : 'profit-neg');
  }
  if (prEl) {
    prEl.textContent = profitRate.toFixed(1) + '%';
    prEl.className   = 'profit-result-val profit-result-main ' + (profitRate >= 0 ? 'profit-pos' : 'profit-neg');
  }
}

/* ── 소계 표시 헬퍼 ── */
function setSubtotal(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = fmtWon(Math.round(val));
}

/* ── setVal 헬퍼 ── */
function setVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  const num = (val != null && !isNaN(val)) ? Math.round(val) : null;
  el.dataset.raw = num != null ? num : '';
  el.value = num != null ? fmtWon(num) : '';
}

/* ── 저장 ── */
async function saveProfitAnalysis() {
  if (!profitItem) return;
  // readonly 자동계산 필드 읽기 (dataset.raw = 만원)
  const g = id => {
    const el = document.getElementById(id);
    if (!el) return null;
    if (el.dataset.raw !== undefined && el.dataset.raw !== '') return parseFloat(el.dataset.raw) || null;
    const v = parseFloat(el.value || '');
    return isNaN(v) ? null : v;
  };
  // 원 단위 입력/editable 필드 읽기 (dataset.raw = 원 → 만원으로 변환)
  const gWon = id => {
    const v = parseFloat(document.getElementById(id)?.dataset.raw || '') || null;
    return v != null ? Math.round(v / 10000) : null;
  };
  const selLabel = (id, table) => {
    const sel = document.getElementById(id);
    if (!sel) return null;
    return (table[profitType] || [])[parseInt(sel.value, 10)]?.label || null;
  };

  // 낙찰가: dataset.raw = 원 → 만원으로 변환
  const winning      = (parseFloat(document.getElementById('pf-winning')?.dataset.raw || '0') || 0) / 10000;
  const loan         = g('pf-loan')       || 0;
  const acqTax       = g('pf-acq-tax')    || 0;
  const deposit      = g('pf-deposit')    || 0;
  const remaining    = g('pf-remaining')  || 0;
  const legalFee     = gWon('pf-legal-fee')  || 0;  // editable, 원 단위
  const eviction     = gWon('pf-eviction')   || 0;  // editable, 원 단위
  const interior     = gWon('pf-interior')   || 0;  // editable, 원 단위
  const monthlyInt   = g('pf-monthly-int')|| 0;
  const totalInt     = g('pf-total-int')  || 0;
  const brokerage    = g('pf-brokerage')  || 0;
  const loanRatio    = parseFloat(document.getElementById('pf-loan-ratio')?.value || '') || null;
  const acqTaxRate   = parseFloat(document.getElementById('pf-acq-tax-rate')?.value || '') || null;
  const acqDep       = gWon('pf-acquired-deposit');    // 원 단위 입력
  const unpaidMnt    = gWon('pf-unpaid-maintenance');  // 원 단위 입력
  const jeonse       = gWon('pf-jeonse-deposit');      // 원 단위 입력
  const mRent        = gWon('pf-monthly-rent');        // 원 단위 입력
  const rentMo       = parseFloat(document.getElementById('pf-rent-months')?.value || '') || null;
  const loanRate     = parseFloat(document.getElementById('pf-loan-rate')?.value || '') || null;
  const holding      = parseFloat(document.getElementById('pf-holding')?.value || '') || null;
  const trRate       = parseFloat(document.getElementById('pf-transfer-tax-rate')?.value || '') || null;
  const transferTax  = gWon('pf-transfer-tax');  // 원 단위 입력
  const salePrice    = gWon('pf-sale-price');    // 원 단위 입력

  const acqScenario  = selLabel('pf-acq-scenario', ACQ_TAX_SCENARIOS);
  const trScenario   = selLabel('pf-transfer-scenario', TRANSFER_TAX_SCENARIOS);

  const costSub  = acqTax + (acqDep||0) + eviction + interior + legalFee + (unpaidMnt||0);
  const ownCap   = Math.max(0, winning - loan + costSub);
  const totalInv = winning + costSub;
  const incomeSub = (jeonse||0) + (mRent||0) * (rentMo||0);
  const expSub    = totalInt + (transferTax||0) + brokerage;
  const totalCost = costSub + expSub;
  const netProfit = ((salePrice||0) - winning) - totalCost;
  const profitRate = ownCap > 0 ? parseFloat((netProfit / ownCap * 100).toFixed(2)) : null;

  const payload = {
    my_auction_id: profitItem.id, buyer_type: profitType,
    winning_price: winning, loan_ratio: loanRatio, loan_amount: loan,
    acq_tax_scenario: acqScenario, acq_tax_rate: acqTaxRate, acq_tax: acqTax,
    bid_deposit: deposit, remaining, legal_fee: legalFee,
    eviction_cost: eviction, interior_cost: interior,
    acquired_deposit: acqDep, unpaid_maintenance: unpaidMnt,
    cost_subtotal: Math.round(costSub), own_capital: Math.round(ownCap),
    jeonse_deposit: jeonse, monthly_rent: mRent, rent_months: rentMo,
    income_subtotal: Math.round(incomeSub),
    loan_rate: loanRate, holding_months: holding,
    monthly_int: monthlyInt, total_int: totalInt,
    transfer_tax_scenario: trScenario, transfer_tax_rate: trRate,
    transfer_tax: transferTax, brokerage_fee: brokerage,
    expense_subtotal: Math.round(expSub),
    sale_price: salePrice,
    total_invest: Math.round(totalInv), net_profit: Math.round(netProfit),
    profit_rate: profitRate,
  };

  const statusEl = document.getElementById('profit-save-status');
  if (statusEl) statusEl.textContent = '저장 중...';
  try {
    const res = await fetch('/api/profit-analysis', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error((await res.json()).error || '저장 실패');
    const result = await res.json();
    profitSaved[profitType] = { ...payload, id: result.id, updated_at: new Date().toISOString() };
    const now = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    if (statusEl) statusEl.textContent = `저장됨 ${now}`;
    showToast('수익률 분석이 저장되었습니다.');
  } catch (e) {
    if (statusEl) statusEl.textContent = '';
    showToast('저장 실패: ' + e.message, 'error');
  }
}
