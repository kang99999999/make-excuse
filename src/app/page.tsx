'use client'

import { useState } from 'react'
import ExcuseModal from '@/components/ExcuseModal'
import RankingModal from '@/components/RankingModal'
import { getRandomExcuse } from '@/lib/getExcuse'
import { getRanking } from '@/lib/excuseApi'

/* ======================
   Options (value / label 분리)
====================== */

const TONES = [
  { value: 'serious', label: '😐 그럴듯 함' },
  { value: 'funny', label: '😏 적당한 유머' },
  { value: 'nonsense', label: '🤯 "멍멍, 왈왈"' },
] as const

const TARGETS = [
  { value: '직장 상사', label: '👔 직장 상사' },
  { value: '동료', label: '👥 동료' },
  { value: '친구', label: '🧑‍🤝‍🧑 친구' },
  { value: '교수님', label: '🧑‍🏫 교수님' },
  { value: '연인', label: '💑 연인' },
  { value: '나에게', label: '🙋‍♂️ 나에게' },
] as const

const SITUATIONS = [
  { value: '지각', label: '⌚ 지각을 했다..' },
  { value: '목표 달성 실패', label: '🎯 목표 달성에 실패했다..' },
  { value: '실수', label: '❗ 실수를 저질렀다..' },
  { value: '약속 취소', label: '📅 약속을 취소하고 싶다..' },
  { value: '아무것도 안 함', label: '😶 아무것도 안 해버렸다..' },
] as const

/* ======================
   Types
====================== */

type Excuse = {
  _id: string
  text: string
  likes: number
}

export default function Home() {
  /* ======================
     State
  ====================== */

  const [tone, setTone] =
    useState<(typeof TONES)[number]['value']>('funny')

  const [target, setTarget] =
    useState<(typeof TARGETS)[number]['value']>(
      TARGETS[0].value
    )

  const [situation, setSituation] =
    useState<(typeof SITUATIONS)[number]['value']>(
      SITUATIONS[0].value
    )

  const [selected, setSelected] = useState<Excuse | null>(null)

  const [showRanking, setShowRanking] = useState(false)
  const [ranking, setRanking] = useState<Excuse[]>([])

  /* ======================
     Handlers
  ====================== */

  const generateExcuse = async () => {
    const result = await getRandomExcuse(target, situation, tone)

    if (!result) {
      alert('아직 준비된 핑계가 없습니다.')
      return
    }

    setSelected(result)
  }

  const openRanking = async () => {
    const list = await getRanking()
    setRanking(list)
    setShowRanking(true)
  }

  /* ======================
     Render
  ====================== */

  return (
    <main className="page">
      <section className="excuse-card">
        <div className="title-box">
          <h1>오늘의 <span style={{color:"#f58a8a"}}>'핑계'</span> 생성기 🙇‍♀</h1>
          <p>⚠️ 재미로만 사용하세요. 실사용은 권장하지 않습니다.</p>
        </div>

        {/* Target */}
        <label className="label">▶ 누구에게 핑계를 대야 하나요?</label>
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value as any)}
        >
          {TARGETS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Situation */}
        <label className="label">▶ 어떤 상황인가요?</label>
        <select
          value={situation}
          onChange={(e) => setSituation(e.target.value as any)}
        >
          {SITUATIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Tone */}
        <div className="tone-selector">
          <p className='tone-label'>▶ 핑계의 농도는?</p>
          <div className="tone-options">
            {TONES.map((t) => (
              <label key={t.value}>
                <input
                  type="radio"
                  name="tone"
                  checked={tone === t.value}
                  onChange={() => setTone(t.value)}
                />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="generate-btn" onClick={generateExcuse}>
          🔥 '핑계' 생성하기
        </button>

        <button className="ranking-btn" onClick={openRanking}>
          🏆 '핑계' 랭킹 보기
        </button>
      </section>

      {/* Excuse Modal */}
      {selected && (
        <ExcuseModal
          excuse={selected}
          onClose={() => setSelected(null)}
          onRetry={generateExcuse}
          onLiked={(likes) => setSelected({ ...selected, likes })}
        />
      )}

      {/* Ranking Modal */}
      {showRanking && (
        <RankingModal
          list={ranking}
          onClose={() => setShowRanking(false)}
        />
      )}
    </main>
  )
}
