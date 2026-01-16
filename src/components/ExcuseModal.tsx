'use client'

import Swal from 'sweetalert2'

type Props = {
  excuse: { text: string; likes: number }
  onClose: () => void
  onRetry: () => void
  onLiked: (likes: number) => void
}

export default function ExcuseModal({
  excuse,
  onClose,
  onRetry,
  onLiked,
}: Props) {
  const isNonsense = excuse.text.includes('강아지') || excuse.text.includes('우주')

  const copy = async () => {
  if (isNonsense) {
    Swal.fire({
      icon: 'warning',
      title: '정말로 이 핑계를 쓰시게요?',
      text: '위험할텐데요.. 😅',
      showCancelButton: true,
      confirmButtonText: '네, 그대로 복사',
      cancelButtonText: '정신 차린다',
    }).then(async (res) => {
      if (res.dismiss === Swal.DismissReason.cancel) {
        await navigator.clipboard.writeText(excuse.text)
        Swal.fire({
          icon: 'success',
          title: '복사 완료 📋',
          timer: 1000,
          showConfirmButton: false,
        })
      }
    })
    return
  }

  // 일반 톤 복사
  await navigator.clipboard.writeText(excuse.text)
  Swal.fire({
    icon: 'success',
    title: '복사 완료 📋',
    timer: 1000,
    showConfirmButton: false,
  })
}


  const like = () => {
    onLiked(excuse.likes + 1)
    Swal.fire({
      icon: 'success',
      title: '👍 좋아요!',
      timer: 1000,
      showConfirmButton: false,
    })
  }

  const retry = () => {
    Swal.fire({
      icon: 'warning',
      title: '다시 만들어볼까요?',
      text: '이번엔 더 그럴듯할 수도, 더 헛소리일 수도 있습니다.',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',

    }).then((res) => {
      if (res.isConfirmed) onRetry()
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="excuse-modal-v2">
        {/* Header */}
        <div className="modal-header-v2">
          <span>😭 오늘의 <span style={{color:"#f58a8a"}}>'핑계'</span>는…? </span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="modal-body-v2">
          <p className="excuse-box">“{excuse.text}”</p>

          <button className="btn primary wide" onClick={retry}>
            🔁 핑계 다시 만들기
          </button>

          <div className="btn-row">
            <button className="btn secondary" onClick={copy}>
              📋 복사하기
            </button>
            <button className="btn ghost" onClick={like}>
              👍 이 핑계.. 좋아요!
            </button>
          </div>
          <p className="modal-warning">
            💥 '핑계'를 대지 않는 사람이 됩시다 !!!💥
          </p>
        </div>
      </div>
    </div>
  )
}
