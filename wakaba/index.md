# 未知の古典テキストに対し単語分割をする手法の紹介
鳥山柚樹

2019/05/14

---

# はじめに
## 形態素解析ツールが通用しない
- 古典籍を解析するための辞書は万能ではない
	- 同時代の作品ならまだしも何百年も時間が離れていると語彙や文法が違ってくる
	- 汎用性のある解析用辞書を作ることができない
- 別な方法を用いる必要がある
	- **文字Nグラムの頻度分析**

---

# 参考にした論文
- 『文字Nグラムの出現確率を利用した単語分割』「人文科学とコンピュータシンポジウム」(2011年12月)
	- [https://ci.nii.ac.jp/naid/170000068415](https://ci.nii.ac.jp/naid/170000068415)

---

# どのような手法か
- 雑に言うと
	- ほかの文章で用例があればそれを単語とみなす、なければそれは単語じゃない

- もう少し丁寧に
	1. 調べたい文字列を細切れにする
	2. その細切れのそれぞれに対し、他の文章のなかで何回それが出現するかをカウントする
	3. 出現頻度が高い「細切れ」は単語である可能性が高い
	4. 1~3の繰り返しで文章を単語に分割してゆく

---

# N-gramとは
```ruby
puts "南無妙法蓮華経".to_ngrams(4) #N = 4のとき

南無妙法
無妙法蓮
妙法蓮華
法蓮華経
```

```ruby:to_ngrams.rb
class String
	def to_ngrams(n)
		arr = []
		for i in 0..self.length-n
			arr.push(self[i..i+n-1])
		end
		return arr
	end
end
```

---

# N-gram(N=1,2,3,…)

- 未知の文「有八百弟子」をぶつ切りに
	- 1-gram: 有	八	百	弟	子
	- 2-gram: 有八	八百	百弟	弟子
	- 3-gram: 有八百	八百弟	百弟子
	- 4-gram: 有八百弟	八百弟子
	- 5-gram: 有八百弟子

- 長さlの文字列を単語に分割する方法は$(l+1)l/2$通りある
	- $(l+1)l/2$個の要素それぞれに対してそれが単語である確率(単語尤度)を計測する
	- もっとも数値が高いものを単語として認識する

---

## 単語尤度の定義１
- $g$ : gram
- $c$ : character
- $c_1,c_2,…c_l$ : 長さlのgramを構成する文字の集合
	- 例
		- $g:= 法華経$
		- $c_1 = 法, c_2 = 華, c_3 = 経$

- $f(x)$ : frequency, xが出現する頻度(確率)
	- $f(x) := \frac{(文章中で文字列xが登場する回数)}{(文章の総文字数)}$
- $L(x)$ : likelihood, gramの単語尤度
	- $L(g) := \frac{1}{1-n}\frac{1}{\ln f(g)}\ln \frac{f(g)}{f(c_1)f(c_2)…f(c_l)}$

---

## 単語尤度の定義２
- gram「吉野」の単語尤度
	- 日本書紀の総文字数は217427
	- 吉野は78回、吉は267回、野は369回出現する
		- $f(吉野) = \frac{78}{217427}$
		- $f(吉) = \frac{267}{217427}$
		- $f(野) = \frac{369}{217427}$
	- ゆえに単語尤度は
		- $L(吉野) = \frac{1}{1-2}\frac{\ln \frac{\frac{78}{217427}}{\frac{267}{217427}\frac{369}{217427}}}{\ln \frac{78}{217427}} = 0.6489777667399772$

---

## 例
- $L(吉野)$ の単語尤度は高い
	- ⇒**「吉野」は一つの単語である可能性が高い**
	- *注、本来は尤度の高低をいうときには他との比較でなければいけない*

---

# 単語決定のアルゴリズム
1. 先頭から１０文字切り出す(長さが１０文字以上もある単語は日本語に存在しないと仮定しているから)
2. その１０文字に対してNグラムを計算する
3. その中で最も単語尤度が高いNグラムを見つける
	- そのNグラムが先頭にある場合はそれを単語と認識する(1に戻る)
	- そうでない場合はそのNグラムより手前にある文字列を取り出し、更に細かい分析をする(2に戻る)
の繰り返し

---

# 実装例
[YUUKIToriyama/wakaba](https://github.com/YUUKIToriyama/wakaba)
- 四時間で作った(設計が💩)
- rubyなので速度が微妙

---

# 自作プログラムでの実験
- 日本書紀全３０巻のテキストデータをもとに第１巻冒頭部分の単語分割をやってみた
- 冒頭部分
> 古天地未剖陰陽不分渾沌如鶏子溟涬而含牙及其淸陽者薄靡而爲天重濁者淹滯而爲地精妙之合搏易重濁之凝竭難故天先成而地後定然後神聖生其中焉故曰開闢之初洲壞浮漂譬猶游魚之浮水上也于時天地之中生一物狀如葦牙便化爲神號國常立尊至貴曰尊自餘曰命並訓美舉等也下皆效此次國狹槌尊次豐斟渟尊凡三神矣乾道獨化所以成此純男

---

# 結果
- 訓読
> 古に天地未だ剖れず、陰陽分れず、混沌にして鶏子の如く、溟涬にして牙を含めり。其の清陽なる者は、靡きて天に為り、重濁なる者は、淹滯りて地に為るに及りて、精妙の合搏するところ易く、重濁の凝竭すること難し。故、天先づ成りて地後に定まる。然して後に神聖其の中に生れり。

- 結果
> 古|天地|未剖|陰|陽|不|分|渾|沌|如|鶏|子|溟|涬|而|含牙|及其|淸|陽|者|薄|靡而|爲天|重|濁|者|淹滯|而爲|地|精|妙|之|合|搏|易|重|濁|之|凝|竭難|故天|先|成|而|地|後定|然|後神|聖生|其中|焉故|曰|開闢|之初|洲|壞|浮漂|譬|猶|游魚|之浮|水上|也于|時天|地|之中|生一|物|狀如|葦牙|便化|爲神|號國|常|立尊|至|貴曰|尊自|餘|曰|命|並|訓|美舉|等也|下皆|效此|次國|狹槌|尊|次|豐|斟渟|尊凡|三神|矣|乾|道|獨化|所以|成|此|純男