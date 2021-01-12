/* MyTimeline.js */

import React from 'react';
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot, TimelineItem,
  TimelineOppositeContent, TimelineSeparator
} from '@material-ui/lab';
import {
  EmojiTransportation,
  SportsCricket,
  Assignment,
  LocalCafe,
  FitnessCenter,
  DriveEta,
  ReportProblem,
  NightsStay,
  Done,
  SmokingRooms,
  LaptopMac,
  Hotel
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function MyTimeline() {
  const classes = useStyles();

  const timeline = [
    {
      hour: "10:30",
      title: "出社",
      description: "愛車のポルシェ(1000万円以上)でフレックス出勤。ジーパン姿でホットドック片手に会社の玄関に到着。",
      icon: <EmojiTransportation />
    },
    {
      hour: "11:30",
      title: "ランチ",
      description: "昼休み。美人OLを連れて健康志向の高級ランチ(@4000円)を食べる。その後出向イギリス人と社員専用のグランドでクリケット対決。 ",
      icon: <SportsCricket />
    },
    {
      hour: "14:30",
      title: "プレゼン",
      description: "昼休み終了。外人役員の前で、早口の英語で新しい金融商品のプレゼン。役員は大喝采。 ",
      icon: <Assignment />
    },
    {
      hour: "15:20",
      title: "古い友人と",
      description: "社員専用のスタバへ、キックボードで移動。出向中のドイツ人と談笑。話題は「ＭＢＡ留学時代の思い出話」 ",
      icon: <LocalCafe />
    },
    {
      hour: "16:00",
      title: "フィットネス",
      description: "フレックスなので退社。ポルシェでジムへ直行、みっちり2時間体を鍛える。 ",
      icon: <FitnessCenter />
    },
    {
      hour: "18:30",
      title: "待ち合わせ",
      description: "美人OLと待ち合わせ。 ",
      icon: <DriveEta />
    },
    {
      hour: "18:35",
      title: "突然のアクシデント",
      description: "歩いているとでかい水溜り発見。20万のコート水溜りにサッと敷いて「姫ならおとうり下さい」。高級ディナー（＠35000円）。 ",
      icon: <ReportProblem />
    },
    {
      hour: "20:00",
      title: "濃厚接触",
      description: "シティホテルのスイートルームで美人OLと濃厚な夜を過ごす。 ",
      icon: <NightsStay />
    },
    {
      hour: "21:00",
      title: "いついかなるときもクールに",
      description: "まだ痙攣している美人OLを尻目に、COOLにホテルを出る。 ",
      icon: <Done />
    },
    {
      hour: "21:20",
      title: "帰宅",
      description: "帰宅。シャワーを浴びて真っ白のバスローブに着替え、片手には高級ワイン。高級葉巻をいっぷく。ひざには黒猫。",
      icon: <SmokingRooms />
    },
    {
      hour: "21:30",
      title: "ネットサーフィン",
      description: "パソコンの電源を付け、仕事スレに「残業おわた　たいしにたいしに　発泡酒とコンビニ弁当食う@35歳ハゲ」と書き込み。 ",
      icon: <LaptopMac />
    },
    {
      hour: "24:30",
      title: "一日の終わりに",
      description: "「早く寝なさい」のAAコピペを貼り、パソコンを切る。ドイツ留学中の彼女と電話し、就寝。 ",
      icon: <Hotel />
    }
  ];

  return (
    <Timeline align="alternate">
      {timeline.map(event => (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">{event.hour}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              {event.icon}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">{event.title}</Typography>
              <Typography>{event.description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))
      }
    </Timeline >
  );
}