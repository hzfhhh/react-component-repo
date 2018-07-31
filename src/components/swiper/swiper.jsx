import React from "react";
import "./style.css";

export default class Swiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperOptions: this.props.swiperOptions,
      swiperWidth: 600,
      swiperHeight: 300,
      swiperList: this.props.swiperOptions.swiperList,
      textColor: "#101010",
      swiperActiveIndex: 0,
      last_swiperActiveIndex: 0,
      interval: ""
    };
  }
  componentDidMount() {
    console.log("ref", this.refs);
    for (let i = 0; i < this.state.swiperList.length; i++) {
      let itemIndex = "swiper-item-" + i;
      if (i === this.state.swiperList.length - 1) {
        this.refs[itemIndex].style.transform = `translateX(${-this.state
          .swiperWidth}px) scale(1)`;
      } else {
        this.refs[itemIndex].style.transform = `translateX(${this.state
          .swiperWidth * i}px) scale(1)`;
      }
    }
    this.setState({
      swiperWidth: this.state.swiperOptions.swiperWidth
        ? this.state.swiperOptions.swiperWidth
        : this.state.swiperWidth,
      swiperHeight: this.state.swiperOptions.swiperHeight
        ? this.state.swiperOptions.swiperHeight
        : this.state.swiperHeight,
      textColor: this.state.swiperOptions.textColor
        ? this.state.swiperOptions.textColor
        : this.state.textColor
    });
  }
  swiperLeft(isClick) {
    if (isClick) {
      clearInterval(this.interval);
    }
    for (let i = 0; i < this.state.swiperList.length; i++) {
      let itemIndex = "swiper-item-" + i;
      if (this.state.swiperActiveIndex === 0) {
        if (i === 0) {
          this.refs[itemIndex].style.transform = `translateX(${
            this.state.swiperWidth
          }px) scale(1)`;
        } else {
          this.refs[itemIndex].style.transform = `translateX(${(i -
            this.state.swiperList.length +
            1) *
            this.state.swiperWidth}px) scale(1)`;
        }
      } else if (
        this.state.swiperActiveIndex ===
        this.state.swiperList.length - 1
      ) {
        if (i === 0) {
          this.refs[itemIndex].style.transform = `translateX(${(2 -
            this.state.swiperList.length) *
            this.state.swiperWidth}px) scale(1)`;
        } else {
          let initX = this.refs[itemIndex].style.transform
            .replace(/(scale\(\d+\))/g, "")
            .replace(/[^0-9\-,]/g, "");
          this.refs[itemIndex].style.transform = `translateX(${+initX +
            this.state.swiperWidth}px) scale(1)`;
        }
      } else if (this.state.swiperActiveIndex === 1) {
        if (i === this.state.swiperList.length - 1) {
          this.refs[itemIndex].style.transform = `translateX(${-this.state
            .swiperWidth}px) scale(1)`;
        } else {
          let initX = this.refs[itemIndex].style.transform
            .replace(/(scale\(\d+\))/g, "")
            .replace(/[^0-9\-,]/g, "");
          this.refs[itemIndex].style.transform = `translateX(${+initX +
            this.state.swiperWidth}px) scale(1)`;
        }
      } else {
        let initX = this.refs[itemIndex].style.transform
          .replace(/(scale\(\d+\))/g, "")
          .replace(/[^0-9\-,]/g, "");
        this.refs[itemIndex].style.transform = `translateX(${+initX +
          this.state.swiperWidth}px) scale(1)`;
      }
    }
    this.setState({
      last_swiperActiveIndex: this.state.swiperActiveIndex
    });
    if (this.state.swiperActiveIndex === 0) {
      this.setState({
        swiperActiveIndex: this.state.swiperList.length - 1
      });
    } else {
      this.setState({
        swiperActiveIndex: --this.state.swiperActiveIndex
      });
    }
    if (isClick && this.props.swiperOptions.autoPlay) {
      this.autoSwiper();
    }
  }
  swiperRight(isClick) {
    if (isClick) {
      clearInterval(this.state.interval);
    }
    for (let i = 0; i < this.state.swiperList.length; i++) {
      let itemIndex = "swiper-item-" + i;
      if (this.state.swiperActiveIndex === 0) {
        //当前显示的轮播图为第一张
        if (i === this.state.swiperList.length - 1) {
          //最后一张图移动到最后面
          this.refs[itemIndex].style.transform = `translateX(${this.state
            .swiperWidth *
            (this.state.swiperList.length - 2)}px) scale(1)`;
        } else {
          //其它图片向左移动一个身位
          let initX = this.refs[itemIndex].style.transform
            .replace(/(scale\(\d+\))/g, "")
            .replace(/[^0-9\-,]/g, "");
          let changeX = -this.state.swiperWidth;
          this.refs[itemIndex].style.transform = `translateX(${+initX +
            changeX}px) scale(1)`;
        }
      } else if (
        this.state.swiperActiveIndex ===
        this.state.swiperList.length - 1
      ) {
        //当前显示的轮播图为最后一张
        if (i === this.state.swiperList.length - 1) {
          //最后一张图片移动到显示位置的左边
          this.refs[itemIndex].style.transform = `translateX(${-this.state
            .swiperWidth}px) scale(1)`;
        } else {
          //其它图片重新排序
          this.refs[itemIndex].style.transform = `translateX(${i *
            this.state.swiperWidth}px) scale(1)`;
        }
      } else if (
        this.state.swiperActiveIndex ===
        this.state.swiperList.length - 2
      ) {
        //当前显示为倒数第二张图片时
        if (i === 0) {
          //第一张图片移动到显示位置的右边
          this.refs[itemIndex].style.transform = `translateX(${
            this.state.swiperWidth
          }px) scale(1)`;
        } else {
          //其它图片往左移动一个身位
          let initX = this.refs[itemIndex].style.transform
            .replace(/(scale\(\d+\))/g, "")
            .replace(/[^0-9\-,]/g, "");
          let changeX = -this.state.swiperWidth;
          this.refs[itemIndex].style.transform = `translateX(${+initX +
            changeX}px) scale(1)`;
        }
      } else {
        //其它情况下，所有图片往左移动一个身位
        let initX = this.refs[itemIndex].style.transform
          .replace(/(scale\(\d+\))/g, "")
          .replace(/[^0-9\-,]/g, "");
        let changeX = -this.state.swiperWidth;
        this.refs[itemIndex].style.transform = `translateX(${+initX +
          changeX}px) scale(1)`;
      }
    }
    this.setState({
      last_swiperActiveIndex: this.state.swiperActiveIndex
    });
    if (this.state.swiperActiveIndex === this.state.swiperList.length - 1) {
      this.setState({
        swiperActiveIndex: 0
      });
    } else {
      this.setState({
        swiperActiveIndex: ++this.state.swiperActiveIndex
      });
    }
    if (isClick && this.props.swiperOptions.autoPlay) {
      this.autoSwiper();
    }
  }
  autoSwiper() {
    this.state.interval = setInterval(() => {
      this.swiperRight();
    }, 2000);
  }
  render() {
    let swiperList = [];
    swiperList = this.state.swiperList.map((item, index) => (
      <div
        className="swiper-item"
        ref={`swiper-item-${index}`}
        key={index}
        style={{
          visibility:
            this.state.swiperActiveIndex === index ? "initial" : "hidden"
        }}
      >
        <img className="swiper-img" src={item.url} alt="" />
        <div className="text" style={{ color: this.state.textColor }}>
          {item.text}
        </div>
      </div>
    ));
    return (
      <div
        className="swiper"
        style={{
          width: `${this.state.swiperWidth}px`,
          height: `${this.state.swiperHeight}px`
        }}
      >
        <img
          src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/q2mC-swiper-left.png"
          className="swiper-left allow"
          onClick={this.swiperLeft.bind(this, 1)}
          alt=""
        />
        <img
          src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/M8Ub-swiper-right.png"
          className="swiper-right allow"
          onClick={this.swiperRight.bind(this, 1)}
          alt=""
        />
        <div className="swiper-content">{swiperList}</div>
      </div>
    );
  }
}
