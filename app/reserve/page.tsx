export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    type: string;
  };
}) {
  return {
    title: searchParams.type,
    description: "The 쉼 펜션 예약 안내",
  };
}

export default function Reserve() {
  return (
    <div className="flex flex-col items-center p-12">
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <table className=" my-16 [&_td]:border-x-2 [&_tr]:border-y-2 [&_td]:text-center [&_td]:text-xs [&_td]:font-semibold [&_td]:p-2">
          <thead className="bg-neutral-100">
            <tr>
              <td rowSpan={2}>객실</td>
              <td rowSpan={2}>넓이(평)</td>
              <td rowSpan={2} className="bg-orange-100">
                시즌
              </td>
              <td rowSpan={2}>주중</td>
              <td rowSpan={2}>금요일</td>
              <td rowSpan={2}>주말/공휴일전날</td>
              <td colSpan={3}>기준인원초과요금</td>
            </tr>
            <tr>
              <td>성인</td>
              <td>아동</td>
              <td>유아</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={3} className="px-10">
                더쉼 101호
              </td>
              <td rowSpan={3}>18평</td>
              <td>비수기</td>
              <td>180,000</td>
              <td>220,000</td>
              <td>220,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>준성수기</td>
              <td>250,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>성수기</td>
              <td>300,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td rowSpan={3} className="px-10">
                더쉼 102호
              </td>
              <td rowSpan={3}>18평</td>
              <td>비수기</td>
              <td>180,000</td>
              <td>220,000</td>
              <td>220,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>준성수기</td>
              <td>250,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>성수기</td>
              <td>300,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td rowSpan={3} className="px-10">
                더쉼 103호
              </td>
              <td rowSpan={3}>18평</td>
              <td>비수기</td>
              <td>180,000</td>
              <td>220,000</td>
              <td>220,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>준성수기</td>
              <td>250,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>성수기</td>
              <td>300,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td rowSpan={3} className="px-10">
                더쉼 201호
              </td>
              <td rowSpan={3}>18평</td>
              <td>비수기</td>
              <td>180,000</td>
              <td>220,000</td>
              <td>220,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>준성수기</td>
              <td>250,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>성수기</td>
              <td>300,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td rowSpan={3} className="px-10">
                더쉼 202호
              </td>
              <td rowSpan={3}>18평</td>
              <td>비수기</td>
              <td>180,000</td>
              <td>220,000</td>
              <td>220,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>준성수기</td>
              <td>250,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
            <tr>
              <td>성수기</td>
              <td>300,000</td>
              <td>300,000</td>
              <td>300,000</td>
              <td colSpan={3}>20,000</td>
            </tr>
          </tbody>
        </table>
        <div className="lg:w-[40vw]">
          &nbsp;객실 요금은 각 객실의 기준 인원이 이용할 수 있는 요금이며
          기준인원을 초과하는 경우 인원 추가금을 지불하셔야합니다. 객실 최대
          인원을 초과한 인원은 입실하실 수 없습니다.
          <br /> [입/퇴실 안내]
          <br /> 입실시각 : 15시
          <br /> 퇴실시각 : 11시
          <br /> 22시 이후 입실하실 경우 펜션으로 미리 연락 부탁드립니다.
          <br />
          <br />
          [인원추가]
          <br /> 성인(8세이상) : 1인 20,000원
          <br /> 아동(0세~7세이하) : 1인 20,000원
          <br />
          <br />
          [공동 바베큐]
          <br /> 종류 : 숯+석쇠+그릴1개
          <br /> - 가능객실 : 전객실
          <br /> - 이용요금 : 2~3인 20,000원, 3~4인 30,000원, 5~6인 40,000원,
          7~8인 50,000원 <br />- 신청시간 : 16:00~19:30 (숯추가리필 20:00까지){" "}
          <br />- 이용시간 : 22시까지 ※ 동계 및 우천 시 이용 가능 <br />
          <br /> [공용 수영장]
          <br /> - 운영기간 : 하절기 <br />- 위치: A동 옆(B동에서 도보 2~3분)
          <br /> - 이용요금 : 무료
          <br /> - 이용시간 : 13:00~18:00(날씨에 따라 운영시간이 조정될 수
          있습니다)
          <br /> - 이용복장 : 수영복,래쉬가드
          <br /> - 수영장 크기 : 7m x 7m
          <br /> - 이용 시 주의사항 <br />
          대형튜브 사용은 안전상의 이유로 통제합니다.
          <br /> 유아는 방수기저귀 착용 후 입수 가능합니다.
          <br /> 고객의 부주의로 인한 안전사고에 대해서는 책임지지
          않습니다. 특히 자녀분들의 안전에 유의해 주시기 바랍니다.
          <br /> 안전수칙은 필히 지켜주시고 안전하고 즐거운 물놀이를 위해
          서로간의 배려 부탁드립니다.
        </div>
      </div>
      <div className="lg:p-8">
        <br />
        [부대시설 및 서비스]
        <br />
        - 주차장
        <br />
        - 전객실 무료 wi-fi
        <br />
        - 갯벌체험(호미.바구니 무료대여,맛소금 개인지참)
        <br />
        - 몽산포랑바다랑 펜션전용 어린이 트렘폴린(방방이)설치(A동 옆에
        위치/B동에서 도보로 2~3분)
        <br />
        - 전용 잔디마당(B동 전 객실 이용 가능)
        <br />
        <br />
        [여행지 거리]
        <br />
        - 몽산포해수욕장 펜션에서 도보3분
        <br />
        - 팜카밀레 허브농원 펜션에서 차량3분
        <br />
        - 몽산포항 펜션에서 차량 3분
        <br />
        - 쥬라기공원 펜션에서 차량12분
        <br />
        - 태안빛축제 펜션에서 차량12분
        <br />
        - 태안 꽃정원 펜션에서 차량 12분
        <br />
        - 안면암 펜션에서 차량 25분
        <br />
        <br />
        [펜션 공지사항]
        <br />
        - 객실환경과 화재 예방을 위하여 객실 내에서는 금연입니다.(고기,생선
        조리불가)
        <br />
        - 오후 10시 이후의 바비큐장 이용 및 고성방가는 타객실 손님을 위하여
        금하오니 양해바랍니다.
        <br />
        - 집기 파손 시에는 펜션지기에게 알려주시기 바랍니다.
        <br />
        - 퇴실시 음식물을 비롯한 모든 쓰레기는 분리수거해 주시고, 사용하신
        주방기구는 세척해 주시기 바랍니다.
        <br />
        <br />
        * 숙박업소는 법적으로 청소년 혼숙이 금지되어 있습니다. 또한 미성년자의
        예약 및 이용은 보호자 미 동반 시 숙박이 불가하며 보호자 동반 없이 현장
        방문 시 환불받을 수 없으며 퇴실 조치됩니다.
        <br />
        * 펜션의 객실 예약 현황은 실시간 예약 특성상 100% 일치하지 않을 수
        있습니다.
        <br />
        * 경우에 따라 1객실에 중복 예약이 발생할 수 있으며, 이 경우 먼저 결제된
        예약 건에 우선권이 있습니다.
        <br />
        * 펜션의 객실 가격은 기간에 따라 상이할 수 있습니다.
        <br />
        * 취소수수료는 결제금액이 아닌 예약 금액(객실 금액 옵션 금액) 기준으로
        책정됩니다.
        <br />
        * 최대 인원 초과 시 입실이 불가할 수 있으며, 해당 사유로 환불을 받으실
        수 없습니다.(유아, 어린이 포함)
        <br />
        * 이용일 당일 예약 후 당일 취소한 경우 이용 당일 취소이므로 환불이
        불가합니다.
        <br />
        * 취소수수료는 판매채널별로 상이할 수 있습니다.
        <br />
        * 당일예약. 당일 입실의 경우(특히 18시 이후 늦은 입실) 이용이 불가할
        수도 있으니 반드시 이용 가능 여부를 펜션 측에 문의 후 구매해 주시기
        바랍니다. Pm21시 이후 예약 건들은 100% 확정예약을 보장하지 않습니다.
        <br />
      </div>
    </div>
  );
}
