<template>
    <div class="error-page">
      <div class="error-content">
        <div class="error-image">
          <img src="@/assets/images/errorPage.png" alt="404" />
        </div>
        <div class="error-info">
          <h1>404</h1>
          <h2>页面未找到</h2>
          <p>抱歉，您访问的页面不存在或已被移除</p>
          <div class="error-actions">
            <a-button type="primary" @click="goBack">返回上一页</a-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Error404",
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .error-page {
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #1a2a6c, #0d185c);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  
    .error-content {
      display: flex;
      align-items: center;
      padding: 40px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
  
      .error-image {
        margin-right: 60px;
        img {
          width: 300px;
          height: auto;
        }
      }
  
      .error-info {
        text-align: left;
  
        h1 {
          font-size: 72px;
          margin: 0;
          background: linear-gradient(45deg, #1ce9ff, #416ce7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
  
        h2 {
          font-size: 32px;
          margin: 20px 0;
          color: #fff;
        }
  
        p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 30px;
        }
  
        .error-actions {
          .el-button {
            margin-right: 16px;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 8px;
            
            &--primary {
              background: linear-gradient(45deg, #1ce9ff, #416ce7);
              border: none;
              
              &:hover {
                opacity: 0.9;
                transform: translateY(-2px);
              }
            }
            
            &:hover {
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }
  
  // 添加响应式设计
  @media screen and (max-width: 768px) {
    .error-page {
      .error-content {
        flex-direction: column;
        text-align: center;
        padding: 20px;
  
        .error-image {
          margin-right: 0;
          margin-bottom: 30px;
          img {
            width: 200px;
          }
        }
  
        .error-info {
          text-align: center;
        }
      }
    }
  }
  </style>
  