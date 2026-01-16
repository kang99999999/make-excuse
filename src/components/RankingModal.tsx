'use client'

type Excuse = {
  _id: string
  text: string
  likes: number
}

type Props = {
  list: Excuse[]
  onClose: () => void
}

export default function RankingModal({ list, onClose }: Props) {
  return (
    <div className="modal-backdrop">
      <div className="ranking-modal-v2">
        {/* Header */}
        <div className="modal-header-v2">
          <span>🔥 '핑계' 랭킹 TOP 5</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="ranking-body">
          {list.slice(0, 5).map((item, idx) => (
            <div key={item._id} className="rank-card">

              {/* 헤더 */}
              <div className="rank-card-header">
                {idx === 0 && '🥇 1위 🎉'}
                {idx === 1 && '🥈 2위 🎉'}
                {idx === 2 && '🥉 3위 🎉'}
                {idx > 2 && `🏅 ${idx + 1}위 🎉`}
              </div>

              {/* 바디 */}
              <div className="rank-card-body">
                <p className="rank-text">“{item.text}”</p>
                <div className="rank-likes">👍 {item.likes}개</div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
