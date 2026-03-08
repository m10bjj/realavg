const supabase = require('./lib/supabase');

/* 환경변수 기반 기본값 (Supabase에 데이터 없을 때 초기화에 사용) */
const DEFAULT_AUTH = {
  id:       process.env.AUTH_ID             || 'm10bjj',
  password: process.env.AUTH_PASSWORD       || 'm10bjj',
  recovery: {
    name:        process.env.AUTH_RECOVERY_NAME  || '지환',
    phone_last4: process.env.AUTH_RECOVERY_PHONE || '1162',
    birthdate:   process.env.AUTH_RECOVERY_BIRTH || '821103',
    pin:         process.env.AUTH_RECOVERY_PIN   || '820918',
  },
};

async function getAuth() {
  const { data, error } = await supabase
    .from('auth_config')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  if (error) {
    /* DB 읽기 오류 시 기존 데이터를 덮어쓰지 않고 예외 throw */
    throw new Error('인증 정보를 읽는 중 오류가 발생했습니다: ' + error.message);
  }

  if (!data) {
    /* 행이 없을 때만(최초 실행) 기본값으로 초기화 */
    await supabase.from('auth_config').upsert({
      id:             1,
      user_id:        DEFAULT_AUTH.id,
      password:       DEFAULT_AUTH.password,
      recovery_name:  DEFAULT_AUTH.recovery.name,
      recovery_phone: DEFAULT_AUTH.recovery.phone_last4,
      recovery_birth: DEFAULT_AUTH.recovery.birthdate,
      recovery_pin:   DEFAULT_AUTH.recovery.pin,
    });
    return DEFAULT_AUTH;
  }

  return {
    id:       data.user_id,
    password: data.password,
    recovery: {
      name:        data.recovery_name,
      phone_last4: data.recovery_phone,
      birthdate:   data.recovery_birth,
      pin:         data.recovery_pin,
    },
  };
}

async function saveAuth(auth) {
  const { error } = await supabase.from('auth_config').upsert({
    id:             1,
    user_id:        auth.id,
    password:       auth.password,
    recovery_name:  auth.recovery.name,
    recovery_phone: auth.recovery.phone_last4,
    recovery_birth: auth.recovery.birthdate,
    recovery_pin:   auth.recovery.pin,
  });
  if (error) throw error;
}

module.exports = { getAuth, saveAuth };
