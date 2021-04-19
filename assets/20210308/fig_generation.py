import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

mu_sigmas = [(3,1),(7,1),(5,0.5),(5,3),(1,0.5),(1,3),(7,0.5),(7,3)]

preds = {'_'.join(map(str,c)):np.random.normal(c[0],c[1],1000) for c in mu_sigmas}
actuals = {'actual_dist':np.random.normal(5,1,1000)}

pred_df = pd.DataFrame(preds)
act_df = pd.DataFrame(actuals)

## coverage
def coverage(target, forecast):
    return (np.mean((target < forecast)))

## quantile loss
def quantile_loss(target, forecast, q):
    l = 2*np.sum(np.abs((forecast - target) * ((target <= forecast) - q)))
    return round(l,2)

target = 5


with plt.style.context('seaborn'):
    quant = [0.0,0.1,0.2,0.5,0.7,0.8,0.9,1.0]

    p_lst = np.arange(0,11)
    error_lst = p_lst-target


    fig, ax = plt.subplots(nrows=2, ncols=4 , figsize=(14,6))

    for i, ax in enumerate(ax.flatten()):
        loss_lst = [quantile_loss(p,target,quant[i]) for p in p_lst]
        ax.plot(error_lst,loss_lst,color='r', alpha=0.4)

        ax.set_title(f"Percentile = {quant[i]}")

        ax.set_ylabel("Quantile Loss")
        ax.set_ylim(-0.5,10.5)

        ax.set_xlabel("Error (Prediction-Target)")
        ax.set_xlim(-5.5,5.5)

    plt.tight_layout()
    plt.show()
    # plt.savefig('loss_v_err.png', dpi=100,
    #             orientation='portrait', papertype=None, format='png')

quantiles = [0.1,0.3,0.5,0.7,0.9]

loss_dict = {}
for p, vals in preds.items():
    loss_ = {}
    for q in quantiles:
        pred = np.quantile(vals, q)
        loss_[q]={'l':quantile_loss(target,pred,q),
                  'c':coverage(target,pred), 
                  'e':round(pred-target,1)
                  }
    loss_dict[p]=loss_



with plt.style.context('seaborn'):
    ax = pred_df.plot(kind='kde', subplots=True, color='b', legend=False, alpha=0.4,
                      sharey=True, sharex=True, layout=(2,4), figsize=(16,7))

    for a, col in zip(ax.flatten(),pred_df.columns):
    #     act_df.plot(kind='kde', color='r',ax=a, legend=False)
        a.plot([5],[0],marker='o',color='r')
        a.set_title("\u03BC={0}, \u03C3={1}".format(*col.split('_')))
        for q in quantiles:
            a.text(-14,0.8-q*0.4,f"{q} :{loss_dict[col][q]}", fontsize='x-large')

    plt.xlim(-15,25)
    plt.tight_layout()
    plt.show()
    # plt.savefig('loss_distro.png', dpi=100,
    #             orientation='portrait', papertype=None, format='png',
    #             transparent=True, bbox_inches=None, pad_inches=0.2, metadata=None)